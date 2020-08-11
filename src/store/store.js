import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import uniqid from 'uniqid';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lines: [], //empty array, filled by addLine() and removeLine(), triggered via sidebar.vue
    metrics:[], //metrics to display (metric_ columns in db)
    filterColumns: [], //filters to apply (filter_ columns in db)

     //initialize array for filters the user added via typeahead
    addedFilters: [],

    //time-based annotations
    context: [
      {date: "2009-11", text:"Barrack Obama elected president"},
      {date: "2017-06", text:"Tobi starts at Bell Labs"}
    ]
  },



  getters: {
    //get reduced list of possible values to display
    getFilterColumns: state => {
      return state.filterColumns.map(col => {
        let visible = col.elements.slice(0,5) //select five most frequent labels
        //identify filters that were added for the current column
        let added = state.addedFilters.filter(x=>x.filter.toLowerCase() == col.display.toLowerCase()) //select added filters that match the column
        visible = visible.concat(added)
        return {
          display: col.display,
          elements: visible,
          autocomplete: col.elements
        }
      })
    },

    //get Lines (triggered via sidebar and )
    getLines: (state) => state.lines,
    getContext: (state) => state.context
  },


  mutations: {
    //initialize a new line (incl. filters in sidebar and actual line in graph), triggered from sidebar
    addLine(state) {
      let line = {}
      //set a color for to identify the line
      //TODO Does not select last two colors for some reason
      let colors = ["#20C5A0","#BD10E0","#F5A623","4A90E2","ACC000"]
      line.color = colors[state.lines.length]

      //TODO: FIX! adding a new line flushes queries of existing lines
      //check if any parameters were passed, if so, take them, if not initialize empty query for db with all possible filters
      //line.query = (Object.keys(query).length !== 0) ? query : {}
      line.query = {}

      let filters = []
      state.filterColumns.forEach(col => {
        col.db_columns.forEach(dbcol => {
          filters.push(dbcol)
        })
      })
      filters.push("metric")
      filters.forEach(filter => line.query[filter] = undefined)
      line.identifier = uniqid.time() //unique identifier to update query or delete line
      Vue.set(state.lines, state.lines.length, line) //push new line at end of lines array
    },

    //remove line from sidebar
    removeLine(state, identifier) {
      if(state.lines.length > 1)
      state.lines.splice(state.lines.findIndex(x=>x.identifier == identifier),1)
    },

    //write query to lines
    writeQuery(state, payload) {
      //console.log("writeQuery() called", payload)
      Vue.set(state.lines[payload.index].query, payload.filter, payload.key)
    },

    //write A PI return to lines (gotten from callAPI())
    writeValues(state, payload) {
      //console.log("writeData called", payload)
      Vue.set(state.lines[payload.index], "values", payload.values)
    },

    //add filter via typeahead
    addFilter(state, payload) {
      Vue.set(state.addedFilters,state.addedFilters.length,payload)
    },

  /*  writeMetrics(state, payload) {

      //Vue.set(state.metrics,payload)
    }*/
  },



  actions: {
    //update queries and get data for them
    getData({dispatch, commit, state}, payload) {
      //console.log("getData() called", payload)
      if(payload.identifier) { //if payload just applies to a single line

        commit('writeQuery',{
          index: state.lines.findIndex(x=>x.identifier == payload.identifier),
          filter: payload.query.filter,
          key: payload.query.key
        })
        dispatch('callAPI',payload.identifier)
      } else { //if it affects all lines (e.g. when a metric is changed)
        state.lines.forEach((line, i) => {
          commit('writeQuery',{
            index: i,
            filter: 'metric',
            key: payload.query.key
          })
          dispatch('callAPI',line.identifier)
        })
      }
    },

    //get data from API
    callAPI( {commit,state}, identifier) {
      let query = state.lines.find(x=>x.identifier == identifier).query
      if(!query.metric) query.metric = "metric_rating_overall" //avoid crash because initial metric has not been defined
      query.type = 'result' //set query end (quasi endpoint) for api.php

      //axios.post( "http://social-dynamics.net/nokiatwin/api.php",query,
      axios.post( "http://localhost:8080/nokiatwin/api_new.php",query, //for development, this is overwritten in vue.config.js
        {headers: {'Content-Type': 'application/json;charset=UTF-8'}
      })
      .then(response => {
        console.log(response)
        commit('writeValues',{
          index: state.lines.findIndex(x=>x.identifier == identifier),
          values: response.data
        })
      })
      .catch(error => {
        console.log(error)
      });
    },


    //get
    getMetricsAndFilters({dispatch, state}) {
      let query = {type: 'metrics'}
      axios.post( "http://localhost:8080/nokiatwin/api_new.php",query, //for development, this is overwritten in vue.config.js
        {headers: {'Content-Type': 'application/json;charset=UTF-8'}
      })
      .then(response => {
        //filter response by metric_ and write it to store
        let metrics = response.data.filter(x=>x.key.startsWith('metric_')).map(item => {
          //if no display name given, use db column
          if(!item.display) item.display = item.key
          return item
        })
        Vue.set(state,'metrics',metrics)

        //filter by filter_ and hand to getFilters() (which can get values for each filter)
        dispatch('getFilters', response.data.filter(x=>x.key.startsWith('filter_')))
      })
      .catch(error => {
        console.log(error)
      });
    },

    getFilters({state}, payload) {
      //transform filters with the same name into a group with multiple db_columns
      let filters = []
      payload.forEach(filter => {
        let exists = filters.find(x=>x.display == filter.display)
        if(exists) {
          exists.db_columns.push(filter.key)
        } else {
          filters.push({display: filter.display, db_columns: [filter.key]})
        }
      })

      //generate lists of columns, then fill them with filters
      filters = filters.map(filter => {
        filter.elements = [] //bucket to fill
        filter.db_columns.forEach(column => {
          let query = {
            type: 'selectors',
            listSelector: column
          }
          //axios.post( "https://social-dynamics.net/nokiatwin/api.php",query,
          axios.post( "http://localhost:8080/nokiatwin/api_new.php",query,  //for development, this is overwritten in vue.config.js
            {headers: {'Content-Type': 'application/json;charset=UTF-8'}
          })
          .then(response => {
            response.data.forEach(element => { //for each item in the list, create a unique object to pass on
              let item = {
                key: element[column],
                filter: column,
                count: element.count
              }
              filter.elements.push(item) //fill the bucket
            })
            filter.elements.sort((a,b) => b.count - a.count)
          })
        })
        return filter
      })
      Vue.set(state,'filterColumns',filters)
    }
  }
})
