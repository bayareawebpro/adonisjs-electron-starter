/**
 * Websocket Client
 */
import Ws from '@adonisjs/websocket-client'
const ws = Ws('ws://127.0.0.1:3333')
ws.on('open', (info) => {
  console.info('› Socket: Open',info)
})
ws.on('error', (error) => console.error('› Socket: Error',error))
ws.connect()

/**
 * Websocket Channel
 */
const chat = ws.subscribe('command')
chat.on('message', (message) => {
  console.info('› SocketChannel: Message')
  const el = document.getElementById('message')
  el.innerText = message.body
  setTimeout(()=>el.innerText = '', 900)
})
chat.on('error', () => {
  console.error('› SocketChannel: Error')
})

/**
 * Websocket Message
 */
const items = ['Ping', 'Pong', 'Ping', 'Pong', 'Ping', 'Pong']
setInterval(()=>{
  chat.emit('message', {
    body: items[Math.floor(Math.random() * items.length)]
  })
}, 2000)
