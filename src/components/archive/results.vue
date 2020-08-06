<template>
  <div class="col" id="main">
    <!--<headline  :queries="queries"/>-->
    <chart :data="results" />
    <!--<button v-on:click="click">check data</button>-->
  </div>
</template>

<script>
import axios from 'axios'
import { bus } from '../main'
import chart from './chart.vue'
import headline from './headline.vue'

export default {
  name: 'results',

  components: {
    chart,
    headline
  },

  data() {
    return {
      results: [],
      queries : [
        {
          metric: undefined,
          location: undefined,
          company: undefined,
          employee_title: undefined
          //country: undefined,
        }, {
          metric: undefined,
          location: undefined,
          company: undefined,
          employee_title: undefined,
          //country: "",
        }
      ],
    }
  },

  created () { //get initial set of queries from sidebar (preselected entries) --> dont
    bus.$on('initial', (parameter) => {
      this.setQuery(parameter)
   })
 },

mounted () { //when mounted
  this.queries.forEach((query,i) => {
    if(query.metric) this.getData(query,i) //if metric (mandatory) is set, check
    //TODO: this still creates too many db requests when initialized
  })

   //start listening on eventbus for updated queries
   bus.$on('query', (parameter) => {
     this.setQuery(parameter)

     //returns promise
     let i = parameter.index
     if(parameter.selector == "metric") {
       this.queries.forEach((query,i) => {
         //this.$set(this.results, i, this.getData(query))

         this.getData(query,i)
       })
     } else {
       this.getData(this.queries[i],i)
       //this.$set(this.results, i, this.getData(this.queries[i]))

     }
  })
},

methods: {
  setQuery: function(parameter) {
    //TODO: create new
    if(parameter.selector == "metric") { //change global queries if the metric was changed
      this.queries.forEach(query => {
        query.metric = parameter.key //assin new parameter
      })
    } else {
      this.queries[parameter.index][parameter.selector] = parameter.key //or jut change parameter if it's not the metric
    }
  },

  getData: function(query,i) {
    //TODO: check if metric is set
    query.type='result' //set query end (quasi endpoint) for api.php
    axios.post( "http://localhost:8080/nokia/nokia-twin/comparison-api.php?",query,
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}
    })
    .then((response) => {
      this.$set(this.results, i, {query: query, data: response.data})
    })
    .catch(error => {
      console.log(error)
    });
  },
  /*click: function() {
    console.log(JSON.stringify(this.results))
  }*/
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main {
  background-color: #F7F7F7;
  }
h1 {
  margin-top: 25%
}
</style>
