<template>
    <svg :width="style.width" :height="style.height" class="lines">
      <g class="lines">
        <path v-for="(line,index) in lines" v-bind:key="index" :d="line" fill="none" :stroke="colors[index]"/>
      </g>
    </svg>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'chart',

  props: {
    data: Array
  },

  data() {
    return {
      colors: ["#50E3C2","#BD10E0"]
    }
  },

  computed: {
    scales: {
      cache: true,
      get() {
        let parseTime = d3.timeParse("%Y-%m");
        let style = this.style

        const x = d3.scaleTime().range([
          style.margin.left,
          style.width - style.margin.left - style.margin.right
        ]);
        const y = d3.scaleLinear().range([
          style.height - style.margin.top - style.margin.bottom,
          style.margin.bottom
        ]);

        d3.axisLeft().scale(x);
        d3.axisBottom().scale(y);

        x.domain([parseTime("2008-01"),parseTime("2020-12")]); //TODO: assign dynamically
        y.domain([0,5]);

       /*if(this.data) {
         let minMax = {dates: [], ratings: []}
         this.data.forEach(result=> {
           d3.extent(result.data,x=>parseTime(x.d)).forEach(date => minMax.dates.push(date))
           d3.extent(result.data,x=>+x.r).forEach(rating => minMax.ratings.push(rating))
         })
          x.domain(d3.extent(minMax.dates)); //TODO: assign dynamically
          y.domain(d3.extent(minMax.ratings));
        } else {
          x.domain([parseTime("2007-01"),parseTime("2020-12")]); //TODO: assign dynamically
          y.domain([0,5]);
        }*/
        return { x, y };
      }
    },

    lines: {
      cache: false,
      get() {
        if(this.data) {
          let parseTime = d3.timeParse("%Y-%m");
          const path = d3.line()
          .curve(d3.curveBasis)
           .x(d => this.scales.x(parseTime(d.d)))
           .y(d => this.scales.y(d.r));

           return this.data.map(values => path(values.data))
        } else {
          return null
        }

      }
    },

    style: function() {
      return {
        width: 1000, //TODO: set to window width
        height: 300,
        margin: {
          top: 25,
          right: 25,
          bottom: 25,
          left: 25
        }
      }
    }
  },

  created () {

  },

  mounted () {
    let g = d3.select("g.lines")
    let style = this.style
    //g.attr("transform","translate("+style.margin.left+","+style.margin.top+")")
    //g.attr("transform","translate(25,25)")
    g.append("g").attr("transform", "translate("+style.margin.left+",0)").call(d3.axisLeft(this.scales.y).ticks(5))
    g.append("g").attr("transform", "translate(0,"+(style.height-style.margin.top-style.margin.bottom)+")").call(d3.axisBottom(this.scales.x).ticks(5))

  /*  this.$nextTick(function () {
      console.log(this.data)
    })*/
  },

  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
svg {
  background-color: white;
}
path {
  transition: d 0.3s
}
</style>
