import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import uniqid from 'uniqid';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lines: [],
    metrics:[
      {key: "rating_overall", display: "Overall Ratings"},
      {key: "rating_balance", display: "Work-Life Balance"},
      {key: "rating_culture", display: "Culture & Values"},
      {key: "rating_career", display: "Career Opportunities"},
      {key: "rating_comp", display: "Compensation & Benefits"},
      {key: "rating_mgmt", display: "Senior Leadership"}
    ],
    filterColumns: [
      {name: "Company", db_columns: ["company"]},
      //{name: "Role", db_columns: ["employee_title"]},
      {name: "Location", db_columns: ["location","country"]},
    ].map(filter => {
      filter.elements = [] //bucket to fill

      filter.db_columns.forEach(column => {
        let query = {
          type: 'selectors',
          listSelector: column
        }
        axios.post( "http://localhost:8080/nokia/nokia-twin/comparison-api.php?",query,
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

    context: [
      {date: "2009-11", text:"Barrack Obama elected president"},
      {date: "2017-06", text:"Tobi starts at Bell Labs"}
    ]
  },



  getters: {

    //get reduced list of possible values to display
    getFilterColumns: state => {
      return state.filterColumns.map(filter => {
        return {
          name: filter.name,
          elements: filter.elements.slice(0,5)
        }
      })
    },

    getLines: (state) => state.lines,
    getContext: (state) => state.context
  },



  mutations: {
    //initialize a new line (incl. filters in sidebar and actual line in graph), triggered from sidebar
    addLine(state, line) {
      //set a color for to identify the line
      let colors = ["#20C5A0","#BD10E0","#F5A623"]
      line.color = colors[state.lines.length]

      //initialize empty query for db with all possible filters
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

    //write query to lines
    writeQuery(state, payload) {
      //console.log("writeQuery() called", payload)
      Vue.set(state.lines[payload.index].query, payload.filter, payload.key)
    },

    //write API return to lines (gotten from callAPI())
    writeValues(state, payload) {
      //console.log("writeData called", payload)
      Vue.set(state.lines[payload.index], "values", payload.values)
    },

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

    callAPI( {commit,state}, identifier) {
      let query = state.lines.find(x=>x.identifier == identifier).query
      if(!query.metric) query.metric = "rating_overall" //avoid crash because initial metric has not been defined
      query.type = 'result' //set query end (quasi endpoint) for api.php

      axios.post( "http://localhost:8080/nokia/nokia-twin/comparison-api.php?",query,
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
