<template>
  <div id="vis" ref="vis">
    <svg :width="width" :height="height">
      <!--<path v-for="(result,index) in results" v-bind:key="index" :d="result.path" />-->
    </svg>
  </div>
</template>

<script>
import axios from 'axios'
import * as d3 from 'd3'
import { bus } from '../main'


export default {
  name: 'vis',

  data() {
    return {
      width: 700,
      height: 800,
      results: [],
      vis: {},
      lines: undefined,
      queries : [
        {
          metric: undefined,
          location: undefined,
          company: undefined,
          //country: undefined,
          //role: undefined,
        }, {
          metric: undefined,
          location: undefined,
          company: undefined,
          //role: "",
          //country: "",
        }
      ],
    }
  },

  methods: {
    getData: function(query,i) {
      axios.post( "http://localhost:8080/nokia/nokia-twin/comparison-api.php?",query,
        {headers: {'Content-Type': 'application/json;charset=UTF-8'}
      })
      .then((response) => {
        this.update()
        this.results[i] = {query: query, data: response.data, path: ""} //send response to this.result
        this.update(i);

      });
    },

  /*  createLines: function() {
      const lines = d3.select("#vis svg").append("g").attr("class","lines").selectAll("path").data().enter()
      .append("path") //TODO: why dont you initialize these?

      return lines
    },*/

    update: function() {
      const scale = this.getScales();
      let parseTime = d3.timeParse("%Y-%m");

      const path = d3.line()
      .curve(d3.curveBasis)
       .x(d => scale.x(parseTime(d.d)))
       .y(d => scale.y(d.r));

       this.results.forEach(result => result.path = path(result.data))
    },

    getScales: function() {
     const x = d3.scaleTime().range([0, 430]); //TODO: width
     const y = d3.scaleLinear().range([210, 0]); //TODO: height
     d3.axisLeft().scale(x);
     d3.axisBottom().scale(y);

     let arr = []
     let parseTime = d3.timeParse("%Y-%m");
     this.results.forEach(result => {
       result.data.forEach(data =>
         arr.push(data)
       )
     })
     x.domain(d3.extent(arr, d => parseTime(d.d)));
     y.domain(d3.extent(arr, d => +d.r));
      return { x, y };
    },



  },

  created () { //get initial set of queries from sidebar (preselected entries)
    bus.$on('initial', (parameter) => { //listen on EventBus for changed queries
      if(parameter.selector == "metric") { //change global queries if the metric was changed
        this.queries.forEach(query => {
          query.metric = parameter.key //assin new parameter
        })
      } else {
        this.queries[parameter.index][parameter.selector] = parameter.key //or jut change parameter if it's not the metric
      }
   })

   //this.lines = this.createLines() //initialize lines
 },


 mounted () { //when mounted
   //get all data from initial query (created in created())
   this.queries.forEach((query,i) => this.getData(query,i))

   this.vis.svg = d3.select("#vis svg")


   //start listening on eventbus for updated
   bus.$on('query', (parameter) => {
     this.queries[parameter.index][parameter.selector] = parameter.key //change query
     this.lastIndex = [parameter.index,parameter.selector] //change index to trigger watch-function
     this.getData(this.queries[parameter.index],parameter.index) //get data for updated query
  })
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lines path {
  fill: none;
  stroke: black
}
</style>
