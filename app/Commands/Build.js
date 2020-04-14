'use strict'

const {Command} = require('@adonisjs/ace')
const {exec} = require('../Services/Shell')

class Build extends Command {

  static get signature() {
    return 'build:app'
  }

  static get description() {
    return 'Compile the electron application bundle.'
  }

  async handle(args, options) {

    this.info('Compiling Application Bundle...')

    exec('cd build && sh ./build.sh',
      this.info.bind(this),
      this.warn.bind(this)
    )
    .then((code)=>{
      this.success('Application Bundle Compiled Successfully...')
    })
    .catch((code)=>{
      this.success(`Process Exited with Code ${code}`)
    })
  }
}

module.exports = Build
