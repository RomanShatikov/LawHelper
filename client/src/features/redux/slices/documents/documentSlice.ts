import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DocumentSliceType, DocumentType } from '../../../../types/document/documentType';

const initialState: DocumentSliceType = {
  documents: [],
  currentDocument: null,
};

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setDocuments: (state, action: PayloadAction<DocumentType[]>) => {
      state.documents = action.payload;
    },
    setCurrentDocument: (state, action: PayloadAction<DocumentType>) => {
      state.currentDocument = action.payload;
    },
  },
});

export const { setDocuments, setCurrentDocument } = documentsSlice.actions;

export default documentsSlice.reducer;
