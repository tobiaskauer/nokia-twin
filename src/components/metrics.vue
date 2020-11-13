<template>
  <div class="metric">
  <template v-if="metrics.length < 5">
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
  props: {
  },

  data() {
    return {
      selected: undefined
    }
  },

  computed: {
    metrics() {
      return this.$store.state.metrics;
    },
    active: {
      get: function() {
        return this.selected
      },
      set: function() {
        return this.selected
      }

    }
  },

  watch: {
    metrics: function() {
      this.active = this.metrics[0].key
    }
  },

  created () {
  },

  mounted () {
  },

  methods: {
    //emit selected element to sidebar, which will update the query
    select: function(item) {
      if(item.key != this.selected){
        this.$store.commit('setActiveMetric', item)
        this.selected = item.key
        this.$store.dispatch('getData', {identifier: false, filter: 'metric', query: item})
      }
    },

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
