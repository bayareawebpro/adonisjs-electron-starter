<script>
  import axios from 'axios'
  export default {
    name: "ShellCommand",
    data: () => ({
      output: [],
      command: 'ls',
    }),
    methods: {
      clear() {
        this.output = []
      },
      execute() {
        axios
          .post('/command', {command: this.command})
          .catch((error) => console.error(error))
      }
    },
    created() {
      ws.subscribe('command').on('output', (message) => {
        this.output.push(message)
      })
    }
  }
</script>
<template>
  <div>
    <div class="grid mb-2">
      <div class="grid-item flex-grow">
        <input class="input" v-model="command" @keydown.enter="execute">
      </div>
      <div class="grid-item flex-shrink">
        <button class="btn btn-lg btn-blue" @click="execute">
          Run
        </button>
      </div>
    </div>
    <v-console v-model="output"/>
  </div>
</template>
