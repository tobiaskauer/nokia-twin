<template>
  <div class="sidebar flex-fill">
    <h1>{{title}}</h1>
    Description text with link to website and also link to methodoly
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
      title: 'Open Inc'
    }
  },

  computed: {
    /*//get lines (incl. color, identifier, filters, and selections) from store
    lines: {
      get: function(){
        return this.$store.state.lines
      }
    },*/

    metrics: function() {
      return this.$store.state.metrics
    },

    filterColumns: function() {
      return  this.$store.state.filterColumns
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

    /*//set filters from URL
    lines: function(newLines){
      if(newLines) {
        //console.log(this.$refs['filterRow-'+newLines[0].identifier])
        this.setFiltersFromURL(this.$route.query)
      }
    }*/
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

    /*initializeFromURL: function(param) {
      if(param.lines) {
        while (param.lines > 0){
          this.$store.dispatch('addLine')
          param.lines--
        }
      } else {
        this.$store.dispatch('addLine')
      }


      let metric
      // if a metric is set in url parameters
      if(param.metric) {
        //look for this metric in current metric storage, if you find sth set it, otherwise set the first one
        metric = this.$store.state.metrics.find(item => item.key ==  param.metric) ? this.$store.state.metrics.find(item => item.key ==  param.metric) : metric = this.$store.state.metrics[0]
      } else {
        //if none is passed, just take the first one
        metric = this.$store.state.metrics[0]
      }
      //set the metric
      this.$refs.metrics.select(metric)
    },*/

    //please dont hate me, but this gets triggered three times as oten as necessary....
    /*setFiltersFromURL: function(param) {

      //find filters
      let filters = []
      this.$store.state.filterColumns.forEach(filterColumn => {
        //console.log(filterColumn) //this is the display name of the columns (e.g. "Location")
        filterColumn.db_columns.forEach(column => {
          if(param[column]) {
            //you can have as many values for a given parameter as you have lines (eg. filtering three lines by three different companes. i corresponds to the line count)
            param[column].split(",").forEach((value,lineCount) => {
              filters[lineCount] = {display: filterColumn.display, element: {filter: column, key: value}}
            })
          }
        })
      })



      //iterate over existing lines (in sidebar) and apply filters from URL
      this.$store.getters.getLines.forEach((line,lineCount) => {
        if(this.$refs['filterRow-'+line.identifier]) {

          let filter = filters[lineCount]
          console.log(filter)
          this.$refs['filterRow-'+line.identifier][0].select(filter.display,filter.element,"initialize")
        }
      })



    },*/
    //add new lines
    addLine: function() {
      //let previousQuery = this.lines[this.lines.length-1] == undefined ? {} : this.lines[this.lines.length-1].query
      //duplicating the previous query to add it to the next technically works, but the two instances seem dependent on another (which is not expected behavior)
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
  min-width: 300px;
  padding: 0px !important;
  //min-height: 100%;
}

ul {
  margin: 0;
  padding: 0
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
