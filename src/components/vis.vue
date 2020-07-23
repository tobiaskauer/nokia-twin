<template>
  <div class="col-9">
    <!--<div v-if="dataState">
      <div v-for="(line,index) in lines" v-bind:key="index">{{line.query}}</div>
    </div>-->
    <svg :width="style.width" :height="style.height" v-if="dataState" class="lines">
      <g class="axes">
        <g v-axis:x="scales" class="xAxes" :transform="`translate(0,${style.height-style.margin.top-style.margin.bottom})`"></g>
        <g v-axis:y="scales" class="yAxes" :transform="`translate(${style.margin.left},0)`"></g>
      </g>
      <g class="context" v-if="showContext">
        <g v-for="(item, index) in context" :key="`context-${index}`" :transform="`translate(${item.x},0)`">
          <line x1="0" x2="0" :y1="style.margin.top" :y2="style.height-style.margin.bottom-style.margin.top" stroke="black" stroke-dasharray="4" />
          <text x="10" :y="style.margin.top+20">{{item.text}}</text>
        </g>
      </g>
      <!--<g class="legend" :transform="`translate(${style.width-style.margin.right-200},100)`">
        <path :d="legend" fill="black"/>
      </g>-->
      <g class="lines" v-for="line in lines" v-bind:key="line.identifier">
        <path v-if="line.path" :d="line.path" :fill="line.color" stroke="none"/>
      </g>
    </svg>

    <svg :width="style.width" height="50" v-if="dataState" style="background-color: lightgrey">
      <g class="lines" v-for="line in lines" v-bind:key="line.identifier" >
        <path v-if="line.micro" :d="line.micro" :stroke="line.color" stroke-opacity="0.5" fill="none"/>
      </g>
      <g class="brush" />
    </svg>


    <form>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="showContext" @click="showContext = !showContext">
        <label class="form-check-label" for="exampleCheck1">Show context</label>
      </div>
    </form>
  </div>
</template>

<script>
import * as d3 from 'd3'
//import { regressionLinear } from 'd3-regression';


export default {
  computed: {
    style: function() {
      return {
        width: 1000, //TODO: set to window width
        height: 500,
        margin: {
          top: 25,
          right: 25,
          bottom: 0 ,
          left: 40
        }
      }
    },

    context: { //get additional information from store
      cache: false,
      get: function() {
        let parseTime = d3.timeParse("%Y-%m");
        let items = this.$store.getters.getContext.map(item => {
          item.x = this.scales.x(parseTime(item.date)) //translate date to position
          return item
        })
        return items
      }
    },


    data: { //get data from store
      cache: false,
      get: function() {
        return this.$store.getters.getLines.map(line => {
          line.touched = 0 //add counter for reactivity when using brush function
          return line
        })
      }
    },

    dataState: function() { //check if every line we received also has data values before we render
      let state = false //asume that condition is not met
      let hasData = this.data.map(line => (line.values) ? true : false) //check if value array exists
      if(hasData.length > 0 && hasData.every(bool => bool)) state = true //check if all lines have data (and if we have lines at all, otherwise condition for every() would be true)
      return state
    },

    scales: {//compute scales
      cache: true,
      get() {
        let parseTime = d3.timeParse("%Y-%m");
        let style = this.style

        const width = d3.scaleLinear().range([2,6])
        const x = d3.scaleTime().range([style.margin.left,style.width - style.margin.left - style.margin.right]);
        const y = d3.scaleLinear().range([
          style.height - style.margin.top - style.margin.bottom,
          style.margin.bottom
        ]);
        const microY = d3.scaleLinear().range([45,5]);
        const microX = d3.scaleLinear().range([style.margin.left,style.width - style.margin.left - style.margin.right]);

        d3.axisLeft().scale(x);
        d3.axisBottom().scale(y);

        if(this.dataState) {
          let arr = [] //not elegant, but easiest way to find extreme values across all lines
          this.data.forEach(line => {
            line.values.forEach(value => {
              arr.push(value)
            })
          })

          let domain = (this.xDomain.length > 0) ? this.xDomain : d3.extent(arr, d => parseTime(d.d)) //if this is the first time, get a the xDomain from data, otherwise it has been set by the brush

          x.domain(domain);
          microX.domain(d3.extent(arr, d => parseTime(d.d))); //definitely set this to the maximum data domain so we can push it to the limit
          y.domain(d3.extent(arr, d => +d.r));
          microY.domain(d3.extent(arr, d => +d.r));
          width.domain(d3.extent(arr, d => +d.c))
        }

        return { x, y, microX, microY, width };
      }
    },

    /*legend: {
      cache: true,
      get: function() {

        const path = d3.area()
        .curve(d3.curveBasis)
        .x(d => d.x)
        .y0(d => d.y0)
        .y1(d => d.y1);

        return path([
          {x:1, y0:1, y1:1},
          {x:10, y0:10, y1:10}
        ])
      }
    },*/



    lines: {
      cache: false,
      get: function() {
        let parseTime = d3.timeParse("%Y-%m");
         const path = d3.area()
         //.curve(d3.curveNatural)
         .curve(d3.curveBasis)
         .x(d => this.scales.x(parseTime(d.d)))
         .y0(d => this.scales.y(d.r)-this.scales.width(d.c))
         .y1(d => this.scales.y(d.r)+this.scales.width(d.c));

         const micro = d3.line()
         .curve(d3.curveBasis)
         .x(d => this.scales.microX(parseTime(d.d)))
         .y(d => this.scales.microY(d.r));

         return this.data.map(line => {
           if(line.values) {
             line.path = path(line.values)
             line.micro = micro(line.values)
           }
           //if(line.values) line.regLine = reg(line.values)
           return line
         })
      }
    },
  },

  directives: {
    axis(el, binding) {//dynamically call and update axis

      //let parseTime = d3.timeParse("%Y-%m");
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];
      d3.select(el).transition().call(d3[axisMethod](methodArg).ticks(5));
    },

    /*brush(el, binding) {
      let scales = binding.value
      const brush = d3.brushX()
        .extent(scales.microX.range().map((e,i) => [e,i*50]))
        .on("start brush", updateX)

      d3.select(el).call(brush).call(brush.move, scales.x.range())
    }*/
  },



  mounted () {
    if(this.dataState) this.brush()
  },

  data() {
    return {
      showContext: true,
      xDomain: []
    }
  },

  methods: {
    brush: function() {
      const brush = d3.brushX()
        .extent(this.scales.microX.range().map((e,i) => [e,i*50]))
        .on("end", this.updateX)

      d3.select("g.brush")
        .call(brush)
        .call(brush.move, this.scales.x.range())
    },
    updateX: function() {
      //TODO domain seems to work, but uses inexicably high values
      let domain = d3.event.selection.map(value => this.scales.microX.invert(value)) //get new domain by getting edges of overlay and translate them to dates
      domain.forEach((value,i) => {
        value
        this.$set(this.xDomain,i,value) //iterate over this array to trigger reactivity
      })


      d3.select(".xAxes").transition().call(d3.axisBottom(this.scales.x)) //update Axis

    }
  }

  /*props: {
  },



  created () {
  },

  methods: {
  },*/
}
</script>

<style scoped>
div {
  background-color: #F7F7F7;
}
svg.lines {
  margin-top: 50px;
  background-color: white;
}
path {
  transition: d .3s
}

.context text {
  font-size: 10px;
}
</style>
