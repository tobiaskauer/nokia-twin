import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

//Vue.use(BootstrapVue)
//Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)

import store from './store/store.js'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
//export const bus = new Vue();

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
