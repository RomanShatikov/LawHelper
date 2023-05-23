import axios from 'axios';
import type { ThunkActionCreater } from '../../../store';
import type { DocumentType } from '../../../../types/document/documentType';
import { setDocuments } from './documentSlice';

export const getDocumentById: ThunkActionCreater<DocumentType['id'] | number> =
  (id) => (dispatch) => {
    axios<DocumentType[]>(`/documents/${id}`)
      .then(({ data }) => dispatch(setDocuments(data)))
      .catch((err) => console.error(err));
  };

export default getDocumentById;
