import { reply, replyNotFound } from '../reply'
import { store } from '../store'

export const get = async (docId: string) => {
  const document = await store.findById(docId)
  if (document === null) {
    return replyNotFound()
  }
  return reply(document.data)
}
