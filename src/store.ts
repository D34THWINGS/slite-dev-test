export type DocumentId = string

export type DocumentStyle = {
  style: string;
  start: number;
  end: number;
}

export type Document = {
  id: DocumentId;
  data: string;
  styles: DocumentStyle[];
}

const createStore = () => {
  const documents = new Map<DocumentId, Document>()

  return {
    insert: async (id: DocumentId) => documents.set(id, { id, data: '', styles: [] }),
    update: async (id: DocumentId, partial: Partial<Document>) => {
      const document = documents.get(id)
      if (!document) {
        return null
      }
      const updatedDocument = { ...document, ...partial }
      documents.set(id, updatedDocument)
      return updatedDocument
    },
    delete: async (id: DocumentId) => documents.delete(id),
    findById: async (id: DocumentId) => {
      const document = documents.get(id)
      return typeof document === 'undefined' ? null : document
    },
  }
}

export const store = createStore()
