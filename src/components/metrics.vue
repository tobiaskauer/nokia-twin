<template>
  <div class="metric">
  <template v-if="metrics.length < 10">
    <ul>
      <li v-for="metric in metrics" :key="metric.key">
        <span v-on:click="select(metric)" :class="{active: metric.key == active}">{{metric.display}}</span>
      </li>
    </ul>
  </template>
  <template v-else>
    <select class="custom-select" @change="filterBullshitFromSelect">
      <option disabled>Choose Metric</option>
      <option v-for="metric in metrics" v-bind:key="metric.key" :value="metric.key">{{metric.display}}</option>
    </select>
  </template>
</div>
</template>

<script>
//import * as d3 from 'd3'

export default {
  data() {
    return {
      active: null
    }
  },

  props: {
    selected: String
  },


  computed: {
    metrics: function() {
      return this.$store.state.metrics;
    }
  },

  created () {
    this.active = this.selected
  },

  mounted () {
  },

  methods: {
    //emit selected element to sidebar, which will update the query
    select: function(item) {
      if(item.key != this.active){
        this.$store.commit('setActiveMetric', item) //set query
        this.active = item.key //make element active

        let route = this.$route.query //get current url parameters as object
        route.metric = item.key //update what you changed
        let routeString = Object.entries(route).map(e => encodeURIComponent(e[0]) + "=" + encodeURIComponent(e[1])).join("&") //parse a string from that object
        history.pushState({},null,this.$route.path + 'nokiatwin/#/?' + routeString) //write that to URL (CAUTION: vueX store and URL might be inconsistent)
        this.$store.commit("writeQuery", {identifier: false, query: {metric: item.key}})
        this.$store.dispatch('getData', {identifier: false})

      }
    },

    //exta loop in case were not using a lust but the select field (which passes too much shit)
    filterBullshitFromSelect: function(event) {
      let key = event.target.value
      let item = this.metrics.find(metric => metric.key == key)
      this.select(item)
    }
  }
}
</script>

<style scoped>
.metric {
  background-image: linear-gradient(135deg, #20C5A0 0%, #BD10E0 47%, #F5A623 100%);
  padding: 30px;
}

ul {
  list-style: none;
  font-size: 12px;
  padding: 0px;
}
ul li {
  width: inline-block;
  text-align: center;
  margin: 0;
  padding: 2px 0;
}

ul li:hover {
  font-weight: bold;
  cursor: pointer;
}

span {
  padding: 4px 2px;
  line-height: 150%;
  border-radius: 4px;
}
.active {
  background: white;
  color: black;
  font-weight: bold;
}
</style>
