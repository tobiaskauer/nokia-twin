<template>
  <div class="col-4 sidebar hidden-md-down">
    <h1>Twin DB</h1>
    <metrics />
    <ul>
      <!-- display filterRow for every lines that is displayed -->
      <filterRow
        v-for="(line, index) in lines"
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
      if(this.lines.length < 1 && newBool) {
        this.addLine()
      }
    }
  },

  mounted() {
  },

  methods: {
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
