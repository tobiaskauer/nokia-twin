<template>
  <div class="sidebar flex-fill">
    <h1>{{title}}</h1>
    <p class="intro" v-if="intro" v-html="intro" />
    <metrics v-if="selectedMetric" ref="metrics" :selected="selectedMetric"/>
    <div class="flex-fill" style="overflow: scroll">
      <div class="addLine">
        <button v-on:click="addLine">Add Line</button>
      </div>
      <p style="padding: 0px 30px">Select filter to change visualization:</p>
      <ul>
        <!-- display filterRow for every lines that is displayed -->
        <filterRow
          v-for="(line, index) in lines"
          :ref="'filterRow-'+line.identifier"
          :key="index"
          :line="line"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import filterRow from './filterRow.vue'
import metrics from './metrics.vue'

export default {
  data() {
    return {
      selectedMetric: undefined,
      lines: undefined,
    }
  },

  computed: {
    metrics: function() {
      return this.$store.state.metrics
    },

    filterColumns: function() {
      return  this.$store.state.filterColumns
    },

    intro: function() {
      if(!this.$store.state.text.intro) return null
      return this.$store.state.text.intro
    },

    title: function() {
      if(!this.$store.state.text.title) return "Open Inc"
      return this.$store.state.text.title
    }
  },

  //if there are no lines on store when page is mounted, add one to always have one line available
  watch: {
    metrics: function(newMetrics) {
      if(newMetrics.length > 0) {
        this.setMetric()
      }
    },

    filterColumns: function(newFilterColumns){
      if(newFilterColumns.length > 0) {
        this.setLines();
      }
    }
  },

  mounted() {

  },

  methods: {
    setMetric: function() {

      //check if URL has a metric (and whether that metric is actually in the current table)
      if(this.$route.query.metric && this.metrics.map(e=>e.key).indexOf(this.$route.query.metric) !== -1) {
        //if so, pass that metric to the component as property
        this.selectedMetric = this.$route.query.metric

      } else {
        //if not passed or not found, just take the first element
        this.selectedMetric = this.metrics[0].key
      }
      this.$store.commit('setActiveMetric', this.metrics.find(metric => metric.key == this.selectedMetric)) //make active (so that we now the scale and can display as label on yaxis)
    },

    setLines: function() {

      //for each line we need, set some queries
      let linesCount = (this.$route.query.lines) ? this.$route.query.lines : 1
      for(let i=0;i<linesCount;i++) {


        //search for filters in the url that match the ones we have in the database
        let query = {metric: this.selectedMetric}
        this.$store.state.filterColumns.forEach(filterColumn => {
          filterColumn.db_columns.forEach(column => {
            if(this.$route.query[column]) {
              if(this.$route.query[column].split(",")[i]) { //do not consider empty values
                query[column] = this.$route.query[column].split(",")[i]
              }
            }
          })
        })
        this.$store.dispatch('addLine',query)
      }
      this.lines = this.$store.getters.getLines;
    },

    //add new lines
    addLine: function() {
      this.$store.dispatch('addLine')

      let route = this.$route.query //get current url parameters as object
      route.lines = this.lines.length
      let routeString = Object.entries(route).map(e => encodeURIComponent(e[0]) + "=" + encodeURIComponent(e[1])).join("&") //parse a string from that object
      history.pushState({},null,this.$route.path + 'nokiatwin/#/?' + routeString) //write that to URL (CAUTION: vueX store and URL might be inconsistent)
    },
  },

  components: {
    filterRow, metrics
  },

  created() {

  },
}
</script>

<style scoped>
h1 {
  text-align: center;
}
.sidebar {
  background-color: #39393B;
  color: white;
  min-width: 350px;
  padding: 0px !important;
  //min-height: 100%;
}

ul {
  margin: 0;
  padding: 0
}

p.intro {
  margin: 10px 30px;
  font-size: .8em;
  text-align: center;
}

p.intro a {
  color: white !important;
  text-decoration: underline;
}

.addLine {
  margin: 10px 30px;
}
.addLine button {
  background: none;
  border: 1px solid white;
  border-radius: 5px;
  padding: 10px;
  color: white;
  width: 100%;
}

.addLine button:hover {
  font-weight: bold;
}

</style>
