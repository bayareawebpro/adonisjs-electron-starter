'use strict'

const ShellCommand = exports = module.exports = {}

const SSH = require('node-ssh')
const websocket = use('Ws')
const files = require('fs')
const {exec} = require('../Services/Shell')

ShellCommand.local = async ({command}) => {

  // Get the broadcasting channel
  const channel = websocket.getChannel('command').topic('command')

  // If the channel is listening to the topic
  if (channel) {
    const output = []
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

  // If the channel is listening to the topic
  if (channel) {

    const output = []
    const ssh = new SSH()

    files.readFile(key, (error, data)=>{
      if(error){
        channel.broadcast('output', error.toString())
        channel.broadcast('done')
        channel.disconnect()
        return
      }
      ssh.connect({
        host: host,
        port: port,
        username: user,
        privateKey:data.toString()
      })
      .then(() => {
        return ssh.exec(command, [], {
          onStdout: (chunk) => output.push(chunk.toString()),
          onStderr: (chunk) =>output.push(chunk.toString()),
          cwd: cwd,
        })
      })
      .then(() => {
        output
          .map((line) => line.split('\n'))
          .flat(1)
          .forEach((line) => {
            channel.broadcast('output', line)
          })
      })
      .catch((error)=>output.push(error.toString()))
      .finally(()=>{
        channel.broadcast('done')
        ssh.dispose()
      })
    })
  }
}
