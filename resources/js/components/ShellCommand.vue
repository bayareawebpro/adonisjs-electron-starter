<script>
  import axios from 'axios'

  export default {
    name: "ShellCommand",
    data: () => ({
      output: [],
      command: 'ls',
    }),
    methods: {
      execute() {
        this.output = []
        axios
          .post('/command', {command: this.command})
          .catch((error) => console.error(error))
      }
    },
    created() {
      ws.subscribe('command').on('command:output', (message) => {
        this.output.push(message)
      })
    }
  }
</script>
<template>
  <div>
    <input v-model="command" @keydown.enter="execute">
    <button class="btn btn-blue" @click="execute">
      Run
    </button>
    <v-console v-model="output"/>
  </div>
</template>
