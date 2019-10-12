import { reply, replyNotFound, Response } from '../reply'
import { DocumentStyle, store } from '../store'

const getStyleMarkdown = (style: string): string => {
  switch (style) {
    case 'bold': return '**'
    case 'italic': return '*'
    default: return ''
  }
}

const applyStyleToText = (text: string, documentStyle: DocumentStyle): string => {
  return text.slice(0, documentStyle.start)
    + getStyleMarkdown(documentStyle.style)
    + text.slice(documentStyle.start, documentStyle.end)
    + getStyleMarkdown(documentStyle.style)
    + text.slice(documentStyle.end)
}

export const get = async (docId: string, format: string = 'txt'): Promise<Response> => {
  const document = await store.findById(docId)
  if (document === null) {
    return replyNotFound()
  }
  if (format === 'md') {
    return reply(document.styles.reduce(applyStyleToText, document.data))
  }
  return reply(document.data)
}
