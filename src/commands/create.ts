import { replySuccess, Response } from '../reply'
import { store } from '../store'

export const create = async (docId: string): Promise<Response> => {
  await store.insert(docId)
  return replySuccess()
}
