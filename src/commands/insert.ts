import { replyNotFound, replySuccess } from '../reply'
import { store } from '../store'

export const insert = async (docId: string, positionOrText: string, text?: string) => {
  const document = await store.findById(docId)
  if (document === null) {
    return replyNotFound()
  }
  const insertedText = typeof text === 'undefined' ? positionOrText : text
  const positionInt = parseInt(positionOrText) || document.data.length
  const editedText = document.data.slice(0, positionInt) + insertedText + document.data.slice(positionInt)
  await store.update(docId, { data: editedText })
  return replySuccess()
}
