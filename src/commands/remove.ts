import { replyNotFound, replySuccess, Response } from '../reply'
import { store } from '../store'

// Note: Delete is a reserved keyword therefore we use remove instead
export const remove = async (docId: string): Promise<Response> => {
  const deleted = await store.delete(docId)
  if (deleted) {
    return replyNotFound()
  }
  return replySuccess()
}
