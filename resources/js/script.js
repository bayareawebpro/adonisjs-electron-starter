import "@babel/polyfill";
import Ws from '@adonisjs/websocket-client'
const ws = Ws('ws://127.0.0.1:3333')
ws.on('open', () => {
  console.info('Sockets Open')
  const chat = ws.subscribe('command')
  chat.on('error', () => {
    console.error('channel error')
  })
  chat.on('message', (message) => {
    console.info({message})
  })

})
ws.on('error', () => {
  console.error('error')
})
ws.connect()
//

//
// setInterval(()=>{
//   ws.getSubscription('chat').emit('message', {
//     username: window.username,
//     body: 'Test'
//   })
// }, 1000)
