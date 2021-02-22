<template>
  <div class="visWrapper" ref="vis" style="margin-top: 50px;">
    <div class="errors">
      <div v-for="(line, i) in lines" :key="i">
        <div v-if="dataState && line.values.length < 1" class="alert alert-danger" role="alert" style="margin-top:10px;">
          Line {{(i+1)}} has no data. Maybe too much filters are active.
        </div>
      </div>
      <div v-if="!$route.query.table" class="alert alert-danger" role="alert" style="margin-top:10px;">
        No table defined
      </div>
    </div>

    <div>
        <svg id="chart" :width="style.width" :height="style.height+style.margin.top + style.margin.bottom" v-if="dataState" class="lines">

          <!--SVG mask to hide overflow -->
          <defs>
            <clipPath id="mask">
              <rect :x="style.margin.left" y="0" :width="style.width" :height="style.height-style.margin.top-style.margin.bottom" />
            </clipPath>
          </defs>

          <!-- axes -->
          <g class="axes" :transform="`translate(0,${style.margin.top})`">
            <text font-size="6pt" y="-10" :x="style.margin.left+10" text-anchor="middle">{{activeMetric.display}}</text>
            <g v-axis:x="scales" class="xAxes" :transform="`translate(0,${style.height-style.margin.top-style.margin.bottom})`"></g>
            <g v-axis:y="scales" class="yAxes" :transform="`translate(${style.margin.left},0)`"></g>
          </g>

          <!--event overlay -->
          <g class="events" v-if="showEvents" clip-path="url(#mask)" :transform="`translate(0,${style.margin.top})`"  >
            <g v-for="(event, index) in events" :class="'event-'+index" :key="`event-${index}`" :transform="`translate(${event.x},0)`">
              <line v-if="event.filters.filter(e => activeFilters.includes(e)).length > 0" x0="0" :y0="style.margin.top" x1="0" :y1="style.height-style.margin.bottom-style.margin.top" stroke="lightgrey" stroke-width="2" fill="lightgrey" @mouseover="showText(true,event,index)" @mouseout="showText(false,{date: '', text: ''},index)" />
            </g>
          </g>

          <!--lines -->
          <g clip-path="url(#mask)" :transform="`translate(0,${style.margin.top})`">
            <g class="lines" v-for="line in lines" v-bind:key="line.identifier" >
              <path v-if="line.path" :d="line.path" :fill="line.color" opacity=".8" stroke="none"/>
            </g>
          </g>

          <!-- legend in bottom right corner -->
          <g class="legend" :transform="`translate(${style.width-style.margin.right-50},${style.height-style.margin.bottom-50})`">
            <g>
              <text text-anchor="end">less confident</text>
              <line x0="0" x1="20" y0="0" y1="0" transform="translate(2,-3)" stroke="black" stroke-width="2"/>
            </g>
            <g transform="translate(0,10)">
              <text text-anchor="end">more confident</text>
              <line x0="0" x1="20" y0="0" y1="0" transform="translate(2,-3)" stroke="black" stroke-width="5"/>
            </g>
            <g transform="translate(0,25)">
              <text v-for="(line, i) in lines" :y="i*10" :fill="line.color" :key="i" text-anchor="end">{{line.legend}}
              <!--  <tspan v-for="(text, j) in lines.query.filter(line=>{console.log("foo")})">foo, </tspan>
                <tspan>bar </tspan>-->
              </text>
            </g>
          </g>
        </svg>
    </div>

    <!--brush for x-axis transformation -->
    <div class="brush">
        <svg :width="style.width" height="50" style="background-color: lightgrey">
          <g v-if="dataState">
            <g class="lines" v-for="line in lines" v-bind:key="line.identifier" >
              <path v-if="line.micro" :d="line.micro" :stroke="line.color" stroke-opacity="0.5" fill="none"/>
            </g>
          </g>
          <g class="brush">
            <g class="leftHandle"><g transform="translate(-5,0)"><path fill="grey"  transform="scale(0.015)" d="M990,500c0-13.6-5.9-25.7-15.2-34.1l0,0L821.7,328l0,0c-8.1-7.3-18.9-11.8-30.7-11.8c-25.4,0-45.9,20.6-45.9,45.9c0,13.6,5.9,25.7,15.2,34.1l0,0l64.1,57.7H175.7l64.1-57.7l0,0c9.3-8.4,15.2-20.6,15.2-34.1c0-25.4-20.6-45.9-45.9-45.9c-11.8,0-22.6,4.5-30.7,11.8l0,0L25.2,465.9l0,0C15.9,474.3,10,486.4,10,500s5.9,25.7,15.2,34.1l0,0L178.3,672l0,0c8.1,7.3,18.9,11.8,30.7,11.8c25.4,0,45.9-20.6,45.9-45.9c0-13.6-5.9-25.7-15.2-34.1l0,0l-64.1-57.7h648.7l-64.1,57.7l0,0c-9.3,8.4-15.2,20.6-15.2,34.1c0,25.4,20.6,45.9,45.9,45.9c11.8,0,22.6-4.5,30.7-11.8l0,0l153.1-137.8l0,0C984.1,525.8,990,513.6,990,500z" /></g></g>
            <g class="rightHandle"><g transform="translate(-5,0)"><path fill="grey"  transform="scale(0.015)" d="M990,500c0-13.6-5.9-25.7-15.2-34.1l0,0L821.7,328l0,0c-8.1-7.3-18.9-11.8-30.7-11.8c-25.4,0-45.9,20.6-45.9,45.9c0,13.6,5.9,25.7,15.2,34.1l0,0l64.1,57.7H175.7l64.1-57.7l0,0c9.3-8.4,15.2-20.6,15.2-34.1c0-25.4-20.6-45.9-45.9-45.9c-11.8,0-22.6,4.5-30.7,11.8l0,0L25.2,465.9l0,0C15.9,474.3,10,486.4,10,500s5.9,25.7,15.2,34.1l0,0L178.3,672l0,0c8.1,7.3,18.9,11.8,30.7,11.8c25.4,0,45.9-20.6,45.9-45.9c0-13.6-5.9-25.7-15.2-34.1l0,0l-64.1-57.7h648.7l-64.1,57.7l0,0c-9.3,8.4-15.2,20.6-15.2,34.1c0,25.4,20.6,45.9,45.9,45.9c11.8,0,22.6-4.5,30.7-11.8l0,0l153.1-137.8l0,0C984.1,525.8,990,513.6,990,500z" /></g></g>
          </g>
        </svg>
    </div>

    <div class="d-flex" style="margin-top: 20px;">
      <div class="events p-8">
        <form>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="showEvents" @click="showEvents = !showEvents">
            <label class="form-check-label" for="exampleCheck1">Events:</label>
          </div>
        </form>
        <div class="currentEvent">
          <span class="date">{{currentEvent.date}}</span>
          <p v-for="(e,i) in currentEvent.content" :key="i"><span v-if="activeFilters.includes(e.filter)" v-html="e.text"></span></p>
          <!--<p v-html="currentEvent.text"></p>-->
        </div>
      </div>
      <div class="p-4 settings" style="border-left: 1px dotted grey; padding-left: 10px;">
        <span class="pickDescription">Start: </span><VueDatePicker @onChange="pickDate(0)" v-model="datePicker[0]" />
        <span class="pickDescription">End: </span><VueDatePicker @onChange="pickDate(1)" v-model="datePicker[1]" />
        <!--Granularity:
        <ui>
          <li @onClick="changeGranularity('day')">Day</li>
          <li @onClick="changeGranularity('week')">Week</li>
          <li @onClick="changeGranularity('month')">Month</li>
          <li @onClick="changeGranularity('year')">Year</li>
        </ui>-->
        <button type="button" class="btn btn-outline-primary btn-sm" @click="savePNG">Download PNG</button>
      </div>
      <div>
        <p v-html="description" /> <!-- {{description}} --> <!-- raw text -->
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { VueDatePicker } from '@mathieustan/vue-datepicker';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';
import * as png from 'save-svg-as-png';


export default {
  components : {
    VueDatePicker,
  },
  data() {
    return {
      showEvents: true,
      currentEvent: {},
      xDomain: [],
      datePicker: [], //empty array to pass dates between datepicker and scales
      brush: null,
      lineThickness: [3,7],
      style: {
        width: 1000, //TODO: set to window width
        height: 300,
        margin: {
          top: 30,
          right: 25,
          bottom: 0 ,
          left: 40
        }
      },
    }
  },

  computed: {
    events: { //get additional information from store
      cache: true,
      get: function() {
        let parseTime = d3.timeParse("%d-%m-%Y");
        /*let events = this.$store.state.events.map(event => {
          event.x = this.scales.x(parseTime(event.date)) //translate date to position
          return event
        })*/

        let events = []
        this.$store.state.events.forEach(event => {
          let index = events.findIndex(element => element.date == event.date)
          if(index === -1) {
            events.push({
              date: event.date,
              x: this.scales.x(parseTime(event.date)),
              filters: [event.filter], //redundant, but easier to use in template
              content: [{
                  filter: event.filter,
                  text: event.text
              }]
            })
          } else {
            events[index].content.push({
                filter: event.filter,
                text: event.text
            })
            events[index].filters.push(event.filter)
          }
        })
        return events
      }
    },


    activeMetric: function() {return this.$store.getters.getActiveMetric},

    //get data from store (this is the computed property "data", not vue's data property)
    data: {
      cache: true,
      get: function() {
        return this.$store.getters.getLines.map(line => {
          line.touched = 0 //add counter for reactivity when using brush function

          //create string of active filters for legend display
          let legend = Object.keys(line.query)
            .filter(key => key.startsWith("filter"))
            .map(key => line.query[key])
            .join(", ")
          line.legend = (legend != "") ? legend : "All data showing, no filters selected"
          return line
        })
      }
    },

    activeFilters: function() { //array of all active filters to determine what event-lines to display
        let foo = this.lines.map(line => {
          if (line.legend != "All data showing, no filters selected") return line.legend
        })
        return foo
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
        let parseTime = d3.timeParse(this.$store.state.granularity);
        let style = this.style

        //set range vor all scales on main chart
        const x = d3.scaleTime().range([style.margin.left,style.width - style.margin.left - style.margin.right]);
        const y = d3.scaleLinear().range([
          style.height - style.margin.top - style.margin.bottom,
          style.margin.bottom
        ]);
        const confidence = d3.scaleLinear().range(this.lineThickness)

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


          let yDomain = d3.extent(arr, d => +d.r)
          if(this.activeMetric.metric_low_end) yDomain[0] = this.activeMetric.metric_low_end
          if(this.activeMetric.metric_high_end) yDomain[1] = this.activeMetric.metric_high_end

          //set domain of all sccales
          x.domain(domain);
          microX.domain(d3.extent(arr, d => parseTime(d.d))); //definitely set this to the maximum data domain so we can push it to the limit
          y.domain(yDomain).nice();
          microY.domain(yDomain);
          confidence.domain(d3.extent(arr, d => +d.c))
        }

        return { x, y, microX, microY, confidence };
      }
    },

    //for each line, compute the actual plot
    lines: {
      cache: false,
      get: function() {
        let parseTime = d3.timeParse(this.$store.state.granularity);

        //generator for area for main visualization
         const path = d3.area()
         .curve(d3.curveBasis) //make curve smooth
         .x(d => this.scales.x(parseTime(d.d)))
         //compute two y-values based on confidence() --> number of reviews that produce the average value
         .y0(d => this.scales.y(d.r)-this.scales.confidence(d.c))
         .y1(d => this.scales.y(d.r)+this.scales.confidence(d.c));

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

    description: function() {
      if(!this.$store.state.text.description) return null
      return this.$store.state.text.description
    }
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
      if(newState) this.initBrush() //initialize brush as soon as you have data
    },

    scales: function() {
      this.datePicker = this.scales.x.domain()
    }
  },



  mounted () {
    this.getWidth()
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWidth);
    })
  },

  methods: {
    pickDate: function(i) {
      let parseTime = d3.timeParse("%Y-%m-%d"); //using different timeformats, redo when this is ever refactored
      this.datePicker[i] = parseTime(this.datePicker[i]) //make sure dates from the picker are Dates and not strings (why the hell does this give ma strings anyway)

      this.$set(this.xDomain,i,this.datePicker[i]) //set x axis for big vis

      d3.select("g.brush")
        .call(this.brush)
        .call(this.brush.move, this.datePicker.map(date => this.scales.microX(date)))
    },

    writeDatestoURL: function(dates) {
      let formatTime = d3.timeFormat("%Y-%m-%d");
      let route = this.$route.query //get current url parameters as object

      route.period = dates.map(date => formatTime(date)).join(",")

      let routeString = Object.entries(route).map(e => encodeURIComponent(e[0]) + "=" + encodeURIComponent(e[1])).join("&") //parse a string from that object
      history.pushState({},null,this.$route.path + 'nokiatwin/#/?' + routeString) //write that to URL (CAUTION: vueX store and URL might be inconsistent)

    },

    savePNG: function() {

      png.saveSvgAsPng(document.getElementById('chart'), 'chart.png')
    },

    /*changeGranularity: function(granularity) {

    }*/


    //initialize brush (dragable selector for x-axis) and add it to DOM
    initBrush: function() {
      this.brush = d3.brushX()
        .extent(this.scales.microX.range().map((e,i) => [e,i*50])) //brush width is range of scale, height is fixed at 50
        .on("end", this.updateX)
        //.on("brush end", this.updateX) //update continously while moving (this may result in crap performance)

        //if url has a timeperiod, use it
        let parseTime = d3.timeParse("%Y-%m-%d")
        let brushPreset = this.$route.query.period
          ? this.$route.query.period.split(",") //split string into two seperate dates
              .map(date => this.scales.microX( //scale them according to the maximum scale defined in the brush
                parseTime(date) //parse string to date
              ))
          : this.scales.x.range() //if period is not set, just use the max range
      d3.select("g.brush")
        .call(this.brush)
        .call(this.brush.move, brushPreset)
    },

    //scale x-axis of visualization to fit boundaries of brush
    updateX: function() {
      let domain = d3.event.selection.map(value => this.scales.microX.invert(value)) //get new domain by getting edges of overlay and translate them to dates
      domain.forEach((value,i) => {
        this.$set(this.xDomain,i,value) //iterate over this array to trigger reactivity
      })

      d3.select(".xAxes").transition().call(d3.axisBottom(this.scales.x)) //update Axis
      this.writeDatestoURL(this.scales.x.domain())

      d3.select("g.brush .leftHandle").attr("transform","translate("+d3.select(".handle--w").attr("x")  +",20)")//.attr("cx",)
      d3.select("g.brush .rightHandle").attr("transform","translate("+d3.select(".handle--e").attr("x")  +",20)")//.attr("cx",)
    },

    getWidth: function() {
      if(this.$refs.vis) {
        this.style.width = this.$refs.vis.clientWidth
        if(this.dataState) {
          this.initBrush()
        }
      }
    },
    showText: function(active,event,index) {
      this.currentEvent = event
      if(active) {
        d3.select(".event-"+index+" line").transition().attr("stroke-width",8).attr("x",-4)
      } else {
        d3.selectAll(".events line").transition().attr("stroke-width",2).attr("x",0)
      }

    }
  }
}
</script>

<style scoped>

svg.lines {
  background-color: white;
}
path {
  transition: d .3s
}

.legend {
  font-size: 6pt;
}

.visWrapper {
  margin: 0 10px;
}

.currentEvent span.date {
  font-size: .8em;
  font-weight: bold;
}

.pickDescription {
  float: left;
  padding: 3px 0;
  width: 50px;
}

.currentEvent text {
  font-size: 10px;
}
</style>
