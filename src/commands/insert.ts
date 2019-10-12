import { replyNotFound, replySuccess, Response } from '../reply'
import { DocumentStyle, store } from '../store'

const getUpdatedStyles = (
  documentStyles: DocumentStyle[],
  insertPosition: number,
) => documentStyles.map(documentStyle => {
  if (insertPosition >= documentStyle.start && insertPosition < documentStyle.end) {
    return { ...documentStyle, end: documentStyle.end + insertPosition }
  }
  return documentStyle
})

export const insert = async (docId: string, positionOrText: string, text?: string): Promise<Response> => {
  const document = await store.findById(docId)
  if (document === null) {
    return replyNotFound()
  }

  const insertedText = typeof text === 'undefined' ? positionOrText : text
  const positionInt = parseInt(positionOrText) || document.data.length
  const editedText = document.data.slice(0, positionInt) + insertedText + document.data.slice(positionInt)

  await store.update(docId, { data: editedText, styles: getUpdatedStyles(document.styles, positionInt) })
  return replySuccess()
}
