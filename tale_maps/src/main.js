import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'


Vue.use(VueRouter)
Vue.use(Vuex)

Vue.config.productionTip = false

import "@/assets/global.css"

import parseLog from "./utility/parseLogs"

import {ids, IDSTRINGS, mapIDs} from "./utility/mappings.js"

const Landing = () => import('./views/Landing.vue')
const VideoGenerator = () => import('./views/VideoGenerator');
const ZoneImageGenerator = () => import('./views/ZoneImageGenerator');
const CanvasDrawer = () => import('./components/CanvasDrawer');



const routes = [
  { path: '/', component: Landing},
  { path: '/video', component: VideoGenerator},
  { path: '/zones', component: ZoneImageGenerator },
  { path: '/zoneCanvas', component: CanvasDrawer },

]

const router = new VueRouter({
  routes // short for `routes: routes`
})

const store = new Vuex.Store({
  state: {
    logs: null,
    file: null,
    error: null,
    zoneMode: null
  },
  mutations: {
    addLog(state, payload) {
      state.file = payload
      parseLog(state.file).then(resp => {
        state.logs = resp
        if (!state.logs) state.error = true
      }).catch(error => {
        console.log(error)
        state.error = true
      })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

