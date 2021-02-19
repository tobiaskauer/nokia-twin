<template>
  <div class="container-fluid d-flex">
    <div class="d-flex">
      <sidebar />
      <vis />
    </div>
  </div>
</template>

<script>
import sidebar from './components/sidebar.vue'
import vis from './components/vis.vue'

export default {
  name: 'App',
  components: {
    sidebar,
    vis
  },

  beforeCreate: function() {
    //get granularity for data aggregation from URL (if non set or value is not an option, use monthly)
    let granularity
    switch(this.$route.query.granularity) {
      case "day": granularity = "%Y-%m-%d"; break;
      case "week": granularity = "%Y-%V"; break;
      case "month": granularity = "%Y-%m"; break;
      case "year": granularity = "%Y"; break;
      default: granularity = "%Y-%m"; break;
    }

    this.$store.state.granularity = granularity

    //set granularity in url in case its not set
    if(!this.$route.query.granularity) {
      let route = this.$route.query //get current url parameters as object
      route.granularity = "month" //default
      let routeString = Object.entries(route).map(e => encodeURIComponent(e[0]) + "=" + encodeURIComponent(e[1])).join("&") //parse a string from that object
      history.pushState({},null,this.$route.path + 'nokiatwin/#/?' + routeString) //write that to URL (CAUTION: vueX store and URL might be inconsistent)
    }

    //set default table (or take from url)
    if(!this.$route.query.table) {
      let route = this.$route.query //get current url parameters as object
      route.table = "example" //default
      let routeString = Object.entries(route).map(e => encodeURIComponent(e[0]) + "=" + encodeURIComponent(e[1])).join("&") //parse a string from that object
      history.pushState({},null,this.$route.path + 'nokiatwin/#/?' + routeString) //write that to URL (CAUTION: vueX store and URL might be inconsistent)
      this.$store.commit('setTable','example') //load metrics and filters --> get errors and display them
    } else {
      this.$store.commit('setTable',this.$route.query.table) //load metrics and filters --> get errors and display them
    }


    this.$store.dispatch('getMetricsAndFilters') //load metrics and filters
    this.$store.dispatch('getEvents') //load metrics and filters
  },
  methods: {

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap');

.container-fluid {
  padding: 0 !important;
}

html, body {
  font-family: 'Karla', sans-serif;
  height: 100%;
}

#app {
  font-family: 'Karla', sans-serif;
}
</style>
