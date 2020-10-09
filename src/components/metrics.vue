<template>
  <ul class="metric">
    <li v-for="metric in metrics" :key="metric.key">
      <span v-on:click="select(metric)" :class="{active: metric.key == active}">{{metric.display}}</span>
    </li>
  </ul>
</template>

<script>
//import * as d3 from 'd3'

export default {
  props: {
  },

  data() {
    return {
      active: undefined
    }
  },

  computed: {
    metrics() {
      return this.$store.state.metrics;
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
      if(item.key != this.active){
        this.active = item.key
        this.$store.dispatch('getData', {identifier: false, filter: 'metric', query: item})
      }
    }
  }
}
</script>

<style scoped>
ul {
  background-image: linear-gradient(135deg, #20C5A0 0%, #BD10E0 47%, #F5A623 100%);
  padding: 20px !important;
  list-style: none;
  font-size: 12px;
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
