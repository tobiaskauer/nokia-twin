<template>
  <div class="col-4 sidebar hidden-md-down">
    <h1>Twin DB</h1>
    <metrics v-bind:initial="'rating_overall'" @clicked="select" />
    <ul>
      <!-- display filterRow for every lines that is displayed -->
      <filterRow
        v-for="(line, index) in lines"
        :key="index"
        :line="line"
        @clicked="select"
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
    lines() {
      return this.$store.state.lines
    }
  },

  mounted() {
    //if there are no lines on store when page is mounted, add one to always have one line available
    if(this.lines.length < 1) {
      this.addLine()
    }

  },

  methods: {
    //add new lines
    addLine: function() {
      //if there are any previous lines, get their queries and pass them to addLine()
      let previousQuery = this.lines[this.lines.length-1] == undefined ? {} : this.lines[this.lines.length-1].query
      this.$store.commit('addLine',previousQuery)
      //after adding the line, get it's data
      this.$store.dispatch('getData', {identifier: false, filter: "metric", query: {key: "rating_overall"}})
      //TODO: Adding a lines crashes the brush - no idea why (maybe force Reload?)
    },

    //as soon as a filter is clicked in filterRow (child component), get its data from store (which will trigger vis update)
    select: function(payload) {
      this.$store.dispatch('getData', payload) //use seperate action for API request (cant call action from mutation)
    }
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
