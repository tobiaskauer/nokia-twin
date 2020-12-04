import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import store from './store/store.js'
import router from './router/router.js'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
//export const bus = new Vue();

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

Vue.mixin({
  methods: {
    setURL: function(foo) {
      console.log(foo)
      console.log(this.$router)
    }
  }
})
