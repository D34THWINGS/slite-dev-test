import { createServer } from 'net'
import { captureMessage } from './messages'

const { PORT = 1337 } = process.env

const server = createServer(connection => {
  captureMessage(connection)
  connection.on('error', error => console.error(error))
})

server.on('error', error => console.error(error))

server.listen(PORT, () => {
  console.log(`Server listens to port ${PORT}`)
})
