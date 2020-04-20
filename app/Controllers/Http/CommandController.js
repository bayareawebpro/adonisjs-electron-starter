'use strict'

const Event = use('Event')

class CommandController {
  async index ({ request, response }) {
    await response.send({message: 'Accepted'})
    await Event.fire('shell::command',request.all())
  }
}

module.exports = CommandController
