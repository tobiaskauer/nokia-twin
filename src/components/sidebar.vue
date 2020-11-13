<template>
  <div class="col-4 sidebar hidden-md-down">
    <h1>Twin DB</h1>
    <metrics ref="metrics" />
    <ul>
      <!-- display filterRow for every lines that is displayed -->
      <filterRow
        v-for="(line, index) in lines"
        :ref="'filterRow-'+line.identifier"
        :key="index"
        :line="line"
      />
    </ul>
    <div class="addLine">
      <button v-on:click="addLine">Add Line</button>
    </div>
  </div>
</template>

<script>
import filterRow from './filterRow.vue'
import metrics from './metrics.vue'

export default {
  props: {
    company: String
  },
  computed: {
    //get lines (incl. color, identifier, filters, and selections) from store
    lines: {
      cache: false,
      get: function(){
        return this.$store.state.lines
      }
    },
    hasMetrics: {
      cache: false,
      get: function() {
        return this.$store.state.metrics.length > 0 ? true : false
      }
    }
  },

  //if there are no lines on store when page is mounted, add one to always have one line available
  watch: {
    hasMetrics: function(newBool) {
      if(newBool) {
        this.initializeFromURL(this.$route.query)
      }
    },
    //set filters from URL
    /*lines: function(newLines){
      if(newLines) {
        //console.log(this.$refs['filterRow-'+newLines[0].identifier])
        this.setFiltersFromURL(this.$route.query)
      }
    }*/
  },

  mounted() {

  },

  methods: {
    initializeFromURL: function(param) {
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
    },

    //please dont hate me, but this gets triggered three times as oten as necessary....
    setFiltersFromURL: function(param) {

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



    },
    //add new lines
    addLine: function() {
      let previousQuery = this.lines[this.lines.length-1] == undefined ? {} : this.lines[this.lines.length-1].query
      this.$store.dispatch('addLine',previousQuery)
    },
  },

  components: {
    filterRow, metrics
  },

  data() {
    return {
    }
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
  min-height: 100%;
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
