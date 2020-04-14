
import Vue from 'vue'
import Ws from '@adonisjs/websocket-client'
window.ws = Ws('ws://127.0.0.1:3333')
ws.connect()

Vue.component('v-console', require('./components/ConsoleOutput').default)
Vue.component('v-command', require('./components/ShellCommand').default)

const app = new Vue(require('./components/App').default)

document.addEventListener("DOMContentLoaded", ()=>{
  app.$mount('#app')
});
