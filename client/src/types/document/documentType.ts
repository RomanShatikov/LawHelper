export type DocumentType = {
  id: number;
  questionId: number;
  urlDoc: string;
};

export type DocumentSliceType = {
  documents: DocumentType[] | [];
  currentDocument: DocumentType | null;
};
