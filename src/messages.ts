import { Socket } from 'net'
import { commands, CommandType } from './commands'
import { reply, Response, responseToString } from './reply'

export const processMessage = (message: Buffer): [CommandType, ...string[]] => {
  const [messageType, ...messageArguments] = message.toString().replace(/\n$/, '').split(':')
  return [messageType as CommandType, ...messageArguments]
}

export const callHandler = (type: CommandType, ...args: string[]) => {
  if (!commands[type]) throw new Error('notImplemented')
  return Promise.resolve(commands[type](...args))
}

export const handleMessage = async (socket: Socket, type: CommandType, ...args: string[]) => {
  let response: Response

  try {
    response = await callHandler(type, ...args)
  } catch (e) {
    console.log(e, e instanceof Error)
    response = e instanceof Error ? reply(null, 500) : e
  }

  console.log(`Request: ${type}:${args.join(':')}`)
  console.log('Replying:', responseToString(response))
  socket.end(responseToString(response), 'utf8')
  socket.pipe(socket)
}

export const captureMessage = (socket: Socket) => {
  let buffer = Buffer.from([])
  socket.on('data', (data) => {
    buffer = Buffer.concat([buffer, data], buffer.length + data.length)
    handleMessage(socket, ...processMessage(buffer))
  })
}
