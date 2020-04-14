'use strict'

const { Command } = require('@adonisjs/ace')
const { promisify } = require('util')
const { exec } = require('child_process')

class Build extends Command {

  static get signature () {
    return 'build:app'
  }

  static get description () {
    return 'Compile the electron application bundle.'
  }

  get exec(){
    return promisify(require('child_process').exec)
  }

  async handle (args, options) {
    this.info('Compiling Application Bundle...')

    const {stdout, stderr} = await this.exec(`cd build && sh ./build.sh`)
    this.info(stdout || stderr)

    this.success('Application Bundle Compiled Successfully...')
  }
}

module.exports = Build
