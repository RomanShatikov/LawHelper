export type DocumentType = {
  id: number;
  title: string;
  questionId: number;
  urlDoc: string;
};

export type DocumentSliceType = {
  documents: DocumentType[] | [];
  currentDocument: DocumentType | null;
};
