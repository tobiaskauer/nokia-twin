import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import uniqid from 'uniqid';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lines: [], //empty array, filled by addLine() and removeLine(), triggered via sidebar.vue
    metrics:[ //Add metrics (and corresponding db-column as key) here
      {key: "rating_overall", display: "Overall Ratings"},
      {key: "rating_balance", display: "Work-Life Balance"},
      {key: "rating_culture", display: "Culture & Values"},
      {key: "rating_career", display: "Career Opportunities"},
      {key: "rating_comp", display: "Compensation & Benefits"},
      {key: "rating_mgmt", display: "Senior Leadership"}
    ],

    //generate lists of columns, then fill them with filters
    //Add additional filter columns (and corresponding db_columns) here
    filterColumns: [
      {name: "Company", db_columns: ["company"]},
      {name: "Location", db_columns: ["location","country"]},
      //{name: "Role", db_columns: ["employee_title"]},
    ].map(filter => {
      filter.elements = [] //bucket to fill
      filter.db_columns.forEach(column => {
        let query = {
          type: 'selectors',
          listSelector: column
        }
        //axios.post( "http://social-dynamics.net/nokiatwin/api.php",query,
        axios.post( "http://localhost:8080/nokiatwin/api.php",query,  //for development, this is overwritten in vue.config.js
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
    }),

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
        let added = state.addedFilters.filter(x=>x.filter.toLowerCase() == col.name.toLowerCase()) //select added filters that match the column
        visible = visible.concat(added)
        return {
          name: col.name,
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
    }

  },



  actions: {
    getData({dispatch, commit, state}, payload) {
      //console.log("getData() called", payload)
      if(payload.identifier) {
        commit('writeQuery',{
          index: state.lines.findIndex(x=>x.identifier == payload.identifier),
          filter: payload.query.filter,
          key: payload.query.key
        })
        dispatch('callAPI',payload.identifier)
      } else {
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
      if(!query.metric) query.metric = "rating_overall" //avoid crash because initial metric has not been defined
      query.type = 'result' //set query end (quasi endpoint) for api.php

      //axios.post( "http://social-dynamics.net/nokiatwin/api.php",query,
      axios.post( "http://localhost:8080/nokiatwin/api.php?",query, //for development, this is overwritten in vue.config.js
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

    }
  }
})
