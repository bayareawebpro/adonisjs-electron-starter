<script>
  import shebang from "./shebang"
  import axios from 'axios'
  import Loading from "./Loading"
  export default {
    name: "ShellCommand",
    components: {Loading},
    data: () => ({
      output: [],
      port: '22',
      user: 'forge',
      key: '/Users/builder/.ssh/id_rsa',
      host: process.env.MIX_REMOTE_IP || '127.0.0.1',
      cwd: '/home/forge',
      command: shebang,
      loading: false,
    }),
    methods: {
      clear() {
        this.output = []
      },
      execute() {
        this.loading=true
        this.clear()
        axios
          .post('/command', {
            command: this.command,
            host: this.host,
            port: this.port,
            user: this.user,
            key: this.key,
            cwd: this.cwd,
          })
          .catch((error) => console.error(error))
      }
    },
    created() {
      const channel = ws.subscribe('command')
      channel.on('done', () => {
        this.loading = false
      })
      channel.on('output', (message) => {
        this.output.push(message)
      })
    }
  }
</script>
<template>
  <div class="text-left">
    <h4 class="text-white">Connection</h4>
    <div class="grid mb-2">
      <div class="grid-item w-1/5">
        <input class="input" v-model="user" @keydown.enter="execute" placeholder="Username">
      </div>
      <div class="grid-item w-1/5">
        <input class="input" v-model="host" @keydown.enter="execute" placeholder="Host">
      </div>
      <div class="grid-item w-1/5">
        <input class="input" v-model="port" @keydown.enter="execute" placeholder="Port">
      </div>
      <div class="grid-item w-1/5">
        <input class="input" v-model="key" @keydown.enter="execute" placeholder="Key path">
      </div>
      <div class="grid-item w-1/5">
        <input class="input" v-model="cwd" @keydown.enter="execute" placeholder="CWD">
      </div>
    </div>
    <h4 class="text-white">Recipe</h4>
    <v-editor
      lang="sh"
      class="input"
      :minLines="6"
      :maxLines="25"
      v-model="command"
    />
    <button
      @click="execute" :disabled="loading"
      class="btn btn-lg btn-green btn-block relative my-5 overflow-hidden">
      <v-loading v-if="loading"/>
      <span v-else>Execute</span>
    </button>
    <h4 class="text-white">Output</h4>
    <v-console v-model="output"/>
  </div>
</template>
