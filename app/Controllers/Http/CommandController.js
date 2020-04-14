'use strict'

const {exec} = require('../Services/Shell')

class CommandController {
  async index ({ request, response }) {
    // exec('cd build && sh ./build.sh',
    //   this.info.bind(this),
    //   this.warn.bind(this)
    // )
    //   .then((code)=>{
    //     this.success('Application Bundle Compiled Successfully...')
    //   })
    //   .catch((code)=>{
    //     this.success(`Process Exited with Code ${code}`)
    //   })
  }
}

module.exports = CommandController
