import { replySuccess } from '../reply'
import { store } from '../store'

export const create = async (docId: string) => {
  await store.insert(docId)
  return replySuccess()
}
