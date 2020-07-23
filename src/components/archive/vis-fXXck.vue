<template>
  <div id="vis" ref="vis">
    {{JSON.stringify(data)}}
  </div>
</template>

<script>
import axios from 'axios'
//import * as d3 from 'd3'
import { bus } from '../main'


export default {
  name: 'vis',
  data() {
    return {
      queries: [],
      data: [],
      results
    }
  },/*
  props: {
    queries: Array
  },*/
mounted() {
  bus.$on('query', function(parameter) { //listen on EventBus for changed queries
    console.log(parameter)
    if(parameter.selector == "metric") {
      this.queries.forEach(function(query) {
        query.metric = parameter.key
      })
    } else {
      this.queries[parameter.index][parameter.selector] = parameter.key
    }
 })
},
  created() {
    //this.queries.forEach((query,i) => this.getData(query,i)) //initial datagrep

    /*bus.$on('updateQuery', function(parameter) { //listen on EventBus for changed queries
      if(parameter.selector == "metric") {
        this.queries.forEach(function(query) {
          query.metric = parameter.key
        })
      } else {
        this.queries[parameter.index][parameter.selector] = parameter.key
      }*/

      /*this.queries.forEach(function(query,i) {
          this.getData(query,i)
      })

   })*/
 },
 watch: {
  /* results: function() {
     console.log("foo")
   }*/
 },
 methods: {
   /*getScales: function() {
    const x = d3.scaleTime().range([0, 430]); //TODO: width
    const y = d3.scaleLinear().range([210, 0]); //TODO: height
    d3.axisLeft().scale(x);
    d3.axisBottom().scale(y);

    let arr = []
    let parseTime = d3.timeParse("%Y-%m");
    this.results.forEach(result =>
      result.data.forEach(data =>
        arr.push(data)
      )
    )
    x.domain(d3.extent(arr, d => parseTime(d.d)));
    y.domain(d3.extent(arr, d => +d.r));
     return { x, y };
   },


   calculatePath: function() {
     const scale = this.getScales();
     let parseTime = d3.timeParse("%Y-%m");
     const path = d3.line()
     .curve(d3.curveBasis)
      .x(d => {
        return scale.x(parseTime(d.d))
        //console.log(scale.x(parseTime(d.d)))
      })
      .y(d => {
        return scale.y(d.r)
        //console.log(type scale.y(d.r))
      });

     this.results.forEach((result,i) => {
       //console.log(scale.y(result.data.r))
       this.results[i].path = path(result.data)
     })
   },

   drawLines: function() {
     console.log(this.results)
     let foo = d3.select("#vis svg").append("g").attr("class","lines").selectAll("path").data(this.results).enter()
     .append("path").attr("d",x=>x.path)
     .attr("fill","none")
     .attr("stroke","black")
     foo
     //.attr("d",x=>x.path)


   },*/


   getData: function(query,i) {
       axios.post( "http://localhost:8080/nokia/nokia-twin/comparison-api.php?",query,
         {headers: {'Content-Type': 'application/json;charset=UTF-8'}
       })
       .then(function(response) {
         this.results[i] = {query: query, data: response.data, path: ""}
       });
   }
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
