export type Response = {
  statusCode: number;
  data: string | null;
}

export const reply = (data: string | null, statusCode = 200): Response => ({ data, statusCode })

export const replyNotFound = () => reply(null, 404)

export const replySuccess = () => reply(null, 200)

export const responseToString = ({ data, statusCode }: Response) => `${data !== null ? data : statusCode}\r\n`
