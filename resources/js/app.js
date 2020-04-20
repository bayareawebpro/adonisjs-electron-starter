import Vue from 'vue'
import Ws from '@adonisjs/websocket-client'


Vue.component('v-console', require('./components/ConsoleOutput').default)
Vue.component('v-command', require('./components/ShellCommand').default)
Vue.component('v-loading', require('./components/Loading').default)
Vue.component('v-editor', require('./components/Editor').default)

const app = new Vue(require('./components/App').default)

document.addEventListener("DOMContentLoaded", ()=>{
  app.$mount('#app')
  window.ws = Ws('ws://127.0.0.1:3333')
  ws.connect()
});
