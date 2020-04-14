'use strict'

const Event = use('Event')

class CommandController {

  async index ({ request, response }) {
    await Event.fire('shell::command',request.input('command'))
    await response.send({message: 'Accepted'})
  }
}

module.exports = CommandController
