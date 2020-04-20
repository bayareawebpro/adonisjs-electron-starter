'use strict'

const ShellCommand = exports = module.exports = {}

const SSH = require('node-ssh')
const websocket = use('Ws')
const files = require('fs')
const {exec} = require('../Services/Shell')

ShellCommand.local = async ({command}) => {

  // Get the broadcasting channel
  const channel = await websocket
    .getChannel('command')
    .topic('command')

  // If the channel is listening
  if (channel) {
    let output = []
    await exec(command,
      (stdOut) => output.push(stdOut),
      (stdErr) => output.push(stdErr),
    )
    .catch((error)=>output.push(error.toString()))
    .finally(() =>{
      channel.broadcast('done')
      output
        .map((line) => line.split('\n'))
        .flat(1)
        .forEach((line) => {
          channel.broadcast('output', line)
        })
    })
  }
}

ShellCommand.remote = async ({host, port, user, key, cwd, command}) => {

  // Get the broadcasting channel
  const channel = await websocket
    .getChannel('command')
    .topic('command')

  // If the channel is listening
  if (channel) {
    let output = []
    const ssh = new SSH()
    ssh.connect({
      host: host,
      port: port,
      username: user,
      privateKey: files.readFileSync(key, 'utf8')
    })
    .catch((error)=>output.push(error.toString()))
    .then(() => ssh.exec(command, [], {
      onStdout: (chunk) => output.push(chunk.toString('utf8')),
      onStderr: (chunk) =>output.push(chunk.toString('utf8')),
      cwd: cwd,
    }))
    .finally(()=>{
      channel.broadcast('done')
      output
        .map((line) => line.split('\n'))
        .flat(1)
        .forEach((line) => {
          channel.broadcast('output', line)
        })
    })
  }
}
