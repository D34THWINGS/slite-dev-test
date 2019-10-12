import { replyNotFound, replySuccess, Response } from '../reply'
import { store } from '../store'

export const format = async (
  docId: string,
  positionStart: string,
  positionEnd: string,
  style: string,
): Promise<Response> => {
  const document = await store.findById(docId)
  if (document === null) {
    return replyNotFound()
  }
  const start = parseInt(positionStart, 10) || 0
  const end = parseInt(positionEnd, 10) || document.data.length - 1
  await store.update(docId, { styles: [...document.styles, { style, start, end }] })
  return replySuccess()
}
