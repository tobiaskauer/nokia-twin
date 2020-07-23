<template>
  <div class="col-sm-3 sidebar hidden-md-down">
    <h1>Twin DB</h1>
    <metrics v-bind:initial="'rating_overall'" @clicked="select" />
    <ul>
      <!-- display filterRow for every lines that is displayed -->
      <filterRow v-for="(line, index) in lines" :key="index" :line="line"  @clicked="select" />
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
  data() {
    return {
    }
  },


  computed: {
    lines() {
      //get lines from store
      return this.$store.state.lines
    }
  },

  mounted() {
    //if there are no lines on store when page is mounted, add one to always have one line available
    if(this.lines.length < 1) {
      this.addLine()
    }

  },

  created() {
  },

  methods: {
    addLine: function() {
      this.$store.commit('addLine',{})
      this.$store.dispatch('getData', {identifier: false, filter: "metric", query: {key: "rating_overall"}})
      //TODO: Adding a lines crashes the brush - no idea why (maybe force Reload?)
    },

    select: function(payload) {
      //mutation (coming from filterRow / metric; going to vueX)
      //this.$store.commit('updateQuery', payload) //use mutation because actions wont Work

      this.$store.dispatch('getData', payload) //use seperate action for API request (cant call action from mutation)
      //this.$store.dispatch('getData', payload) //use seperate action for API request (cant call action from mutation)
    }
  },

  components: {
    filterRow, metrics
  }
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
