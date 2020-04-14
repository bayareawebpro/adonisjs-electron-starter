import Vue from 'vue'

Vue.component('v-console', require('./components/ConsoleOutput').default)

const app = new Vue({
  template: `<v-console :value="['asd']"></v-console>`
})
document.addEventListener("DOMContentLoaded", ()=>{
  app.$mount('#app')
});
