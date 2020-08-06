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
      <g class="extremeValues" v-if="dataState">
        <g v-for="(extremeLine, index) in extremeValues" v-bind:key="'extreme-'+index">
          <circle v-for="(circle, index) in extremeLine.circles" :key="'circle-'+index" :cx="circle.x" :cy="circle.y" r="10" fill="none" :stroke="extremeLine.color" stroke-width="1" stroke-dasharray="4 1"/>
        </g>
      </g>
      <g class="legend" :transform="`translate(${style.width-style.margin.right-50},${style.height-style.margin.bottom-50})`">
        <g>
          <text text-anchor="end">less confident</text>
          <line x0="0" x1="20" y0="0" y1="0" transform="translate(2,-3)" stroke="black" stroke-width="2"/>
        </g>
        <g transform="translate(0,10)">
          <text text-anchor="end">more confident</text>
          <line x0="0" x1="20" y0="0" y1="0" transform="translate(2,-3)" stroke="black" stroke-width="5"/>
        </g>

      </g>
      <g class="lines" v-for="line in lines" v-bind:key="line.identifier" >
        <path v-if="line.path" :d="line.path" :fill="line.color" stroke="none"/>
        <!--<path v-if="line.path" :d="line.path" :stroke="line.color" fill="none"/>-->
      </g>
    </svg>

    <!--brush for x-axis transformation -->
    <svg :width="style.width" height="50" style="background-color: lightgrey">
      <g v-if="dataState">
        <g class="lines" v-for="line in lines" v-bind:key="line.identifier" >
          <path v-if="line.micro" :d="line.micro" :stroke="line.color" stroke-opacity="0.5" fill="none"/>
        </g>
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
        height: 300,
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

    //get data from store (this is the computed property "data", not vue's data property)
    data: {
      cache: false,
      get: function() {
        return this.$store.getters.getLines.map(line => {
          line.touched = 0 //add counter for reactivity when using brush function
          return line
        })
      }
    },

    //check if every line we received also has data values before we render
    dataState: function() {
      let state = false //asume that condition is not met
      let hasData = this.data.map(line => (line.values) ? true : false) //check if value array exists
      if(hasData.length > 0 && hasData.every(bool => bool)) state = true //check if all lines have data (and if we have lines at all, otherwise condition for every() would be true)
      return state
    },

    //compute scales based on values of all passed lines
    scales: {
      cache: true,
      get() {
        let parseTime = d3.timeParse("%Y-%m");
        let style = this.style

        //set range vor all scales on main chart
        const x = d3.scaleTime().range([style.margin.left,style.width - style.margin.left - style.margin.right]);
        const y = d3.scaleLinear().range([
          style.height - style.margin.top - style.margin.bottom,
          style.margin.bottom
        ]);
        const confidence = d3.scaleLinear().range([3,6])

        //set range vor all scales on brushable micro chart
        const microX = d3.scaleLinear().range([style.margin.left,style.width - style.margin.left - style.margin.right]);
        const microY = d3.scaleLinear().range([45,5]);

        //bind scales to axes
        d3.axisLeft().scale(x);
        d3.axisBottom().scale(y);

        //get minimum and maximum values for each line (i know, it's not elegant :)
        if(this.dataState) {
          let arr = []
          this.data.forEach(line => {
            line.values.forEach(value => {
              arr.push(value)
            })
          })

          //if this is the first time, get a the xDomain from data, otherwise it has been set by the brush
          let domain = (this.xDomain.length > 0) ? this.xDomain : d3.extent(arr, d => parseTime(d.d))

          //set domain of all sccales
          x.domain(domain);
          microX.domain(d3.extent(arr, d => parseTime(d.d))); //definitely set this to the maximum data domain so we can push it to the limit
          y.domain(d3.extent(arr, d => +d.r)).nice();
          microY.domain(d3.extent(arr, d => +d.r));
          confidence.domain(d3.extent(arr, d => +d.c))
        }

        return { x, y, microX, microY, confidence };
      }
    },

    
    extremeValues: function(){
      let parseTime = d3.timeParse("%Y-%m");
      let domain = this.scales.x.domain()

      return this.data.map(line => { //create array for all lines. look in all lines...

        //look for values that are within the visible boundaries of the x-axis
        let visible = line.values.filter(value => {
          let date = parseTime(value.d)
          return (date > domain[0] && date < domain[1]) ? true : false;
        })

        //form those, get two peaks and two valley values
        let sorted = visible.sort((a,b) => a.r - b.r)
        let extreme = sorted.slice(0,2).concat(sorted.slice(sorted.length-2,sorted.length))

        let circles = extreme.map(value => {
          return {
            x: this.scales.x(parseTime(value.d)),
            y: this.scales.y(value.r)
          }
        })
        let obj = {
          color: line.color,
          circles: circles
        }
        return obj
      })
    },


    //for each line, compute
    lines: {
      cache: false,
      get: function() {
        let parseTime = d3.timeParse("%Y-%m");

        //generator for area for main visualization
         const path = d3.area()
         .curve(d3.curveBasis) //make curve smooth
         .x(d => this.scales.x(parseTime(d.d)))
         //compute two y-values based on confidence() --> number of reviews that produce the average value
         .y0(d => this.scales.y(d.r)-this.scales.confidence(d.c))
         .y1(d => this.scales.y(d.r)+this.scales.confidence(d.c));

         /*const path = d3.line()
         .x(d => this.scales.x(parseTime(d.d)))
         .y(d => this.scales.y(d.r));*/

         //generator line for brushable micro visualzation
         const micro = d3.line()
         .curve(d3.curveBasis)
         .x(d => this.scales.microX(parseTime(d.d)))
         .y(d => this.scales.microY(d.r));

         return this.data.map(line => {
           if(line.values) {
             //compute paths based on line values
             line.path = path(line.values)
             line.micro = micro(line.values)
           }
           return line
         })
      }
    },
  },



  directives: {
    axis(el, binding) {//dynamically call and update axis
      const axis = binding.arg;
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];
      d3.select(el).transition().call(d3[axisMethod](methodArg).ticks(5));
    },
  },

  watch: {
    dataState: function(newState) {
      //TODO: Brush is not initialized when the size is initially loaded. No idea why.
      if(newState) this.brush() //initialize brush as soon as you have data
    }
  },



  mounted () {
  },

  data() {
    return {
      showContext: true,
      xDomain: []
    }
  },

  methods: {
    //initialize brush (dragable selector for x-axis) and add it to DOM
    brush: function() {
      const brush = d3.brushX()
        .extent(this.scales.microX.range().map((e,i) => [e,i*50]))
        .on("end", this.updateX)
        //.on("brush end", this.updateX) //update continously while moving (this may result in crap performance)

      d3.select("g.brush")
        .call(brush)
        .call(brush.move, this.scales.x.range())


    },
    //scale x-axis of visualization to fit boundaries of brush
    updateX: function() {
      let domain = d3.event.selection.map(value => this.scales.microX.invert(value)) //get new domain by getting edges of overlay and translate them to dates
      domain.forEach((value,i) => {
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

.legend {
  font-size: 6pt;
}

.context text {
  font-size: 10px;
}
</style>
