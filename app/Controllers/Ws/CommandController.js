'use strict'

class CommandController {

  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
  onMessage (message) {
    this.socket.broadcast('message', message)
  }
  onClose () {
    // same as: socket.on('close')
  }
  onError () {
    // same as: socket.on('error')
  }
}

module.exports = CommandController
