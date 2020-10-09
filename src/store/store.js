import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import uniqid from 'uniqid';

Vue.use(Vuex)

let server = "http://localhost:8080/nokiatwin/api.php" //development
//let server = "https://social-dynamics.net/nokiatwin/api.php" // production

export default new Vuex.Store({
  state: {
    lines: [], //empty array, filled by addLine() and removeLine(), triggered via sidebar.vue
    metrics:[], //metrics to display (metric_ columns in db)
    filterColumns: [], //filters to apply (filter_ columns in db)
    colors: [
      {hex: "#20C5A0", used: false},
      {hex: "#BD10E0", used: false},
      {hex: "#F5A623", used: false},
      {hex: "#4A90E2", used: false},
      {hex: "#ACC000", used: false}
    ],
    addedFilters: [], //initialize array for filters the user added via typeahead
    events: []
  },



  getters: {
    //get reduced list of possible values to display
    getFilterColumns: state => {
      return state.filterColumns.map(col => {
        let visible = col.elements.slice(0,5) //select five most frequent labels
        //identify filters that were added for the current column
        let added = state.addedFilters.filter(x=>col.db_columns.includes(x.filter)) //select added filters that match any of the given db columns
        visible = visible.concat(added)

        return {
          display: col.display,
          filters: col.db_columns,
          elements: visible,
          autocomplete: col.elements.filter(x=>x.key != null)
        }
      })
    },

    //get Lines (triggered via sidebar and )
    getLines: (state) => state.lines,
    getContext: (state) => state.context
  },


  mutations: {
      //remove line from sidebar
    removeLine(state, identifier) {
      //make used color available again
      Vue.set(state.colors.find(x=>x.used == identifier),'used',false)
      //delete line from state
      if(state.lines.length > 1) state.lines.splice(state.lines.findIndex(x=>x.identifier == identifier),1)
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
  },



  actions: {
    //initialize a new line (incl. filters in sidebar and actual line in graph), triggered from sidebar
    addLine(
      {state, dispatch},
      //query //query is provided as payload in sidebar.vue
    ) {
      let line = {}

      //TODO: hand over previous query to newly created line
      line.query = {}

      //unique identifier to update query or delete line
      line.identifier = uniqid.time()

      //assign an unused color and mark it used
      let colorIndex = state.colors.findIndex(element  => !element.used)
      line.color = state.colors[colorIndex].hex
      Vue.set(state.colors[colorIndex],'used',line.identifier)
      Vue.set(state.lines, state.lines.length, line) //push new line at end of lines array

      dispatch('getData', {
        identifier: false,
        filter: "metric",
        query: {key: state.metrics[0].key} //TODO replace with first metric (as soon as its initialized)
      })
    },


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
          //dispatch('debugAPI')
        })
      }
    },

    //get data from API
    callAPI( {commit,state}, identifier) {
      //get query for line based on its identifier
      let query = state.lines.find(x=>x.identifier == identifier).query
      query.type = 'result' //set query end (quasi endpoint) for api.php

      //axios.post( "https://social-dynamics.net/nokiatwin/api.php",query,
      axios.post( server,query, //for development, this is overwritten in vue.config.js
        {headers: {'Content-Type': 'application/json;charset=UTF-8'}
      })
      .then(response => {
        commit('writeValues',{
          index: state.lines.findIndex(x=>x.identifier == identifier),
          values: response.data
        })
      })
      .catch(error => {
        console.log(error)
      });
    },

    debugAPI() {
      let query = {
        type: 'debug',
        metric: 'metric_rating_overall',
        filter_company: 'starbucks',
        filter_country: 'United Kingdom',
        filter_employee_title: 'Barista'
      }
      axios.post( server,query, //for development, this is overwritten in vue.config.js
        {headers: {'Content-Type': 'application/json;charset=UTF-8'}
      })
      .then(response => {
        console.log(response.data.split("end_output")[0])
      })
      .catch(error => {
        console.log(error)
      });
    },


    //get Metrics and Filters once to write them to storage
    getMetricsAndFilters({dispatch, state}) {
      let query = {type: 'metrics'}
      axios.post( server,query, //for development, this is overwritten in vue.config.js
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

    getEvents({state}) {
      let query = {type: 'events'}
      axios.post( server,query, //for development, this is overwritten in vue.config.js
        {headers: {'Content-Type': 'application/json;charset=UTF-8'}
      })
      .then(response => {
        Vue.set(state,'events',response.data)
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
          axios.post( server,query,  //for development, this is overwritten in vue.config.js
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
