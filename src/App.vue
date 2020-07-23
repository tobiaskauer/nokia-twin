<template>
  <div class="container-fluid h-100">
    <div class="row justify-content-center h-100">
      <sidebar />

      <!--<results />-->
      <vis />
    </div>
  </div>
</template>

<script>

import sidebar from './components/sidebar.vue'
import vis from './components/vis.vue'
//import { bus } from './main'

export default {
  name: 'App',
  components: {
    sidebar,
    vis
  },
  methods: {

  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap');

html, body {
  font-family: 'Karla', sans-serif;
  height: 100%;
}


#app {
  font-family: 'Karla', sans-serif;
}
</style>
