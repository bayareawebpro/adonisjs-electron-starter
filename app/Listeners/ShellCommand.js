'use strict'

const ShellCommand = exports = module.exports = {}

const {exec} = require('../Services/Shell')

const ws = use('Ws')

ShellCommand.execute = async (command) => {
  const channel = ws
    .getChannel('command')
    .topic('command')

  if (channel) {
    const output = []
    await exec(command,
      (stdOut) => output.push(stdOut),
      (stdErr) => output.push(stdErr),
    ).then(() => {
      output
        .map((line) => line.split('\n'))
        .flat(1)
        .forEach((line) => {
          channel.broadcast('command:output', line)
        })
    })
    .catch((error) => {
      channel.broadcast('command:output', error)
    })
  }
}
