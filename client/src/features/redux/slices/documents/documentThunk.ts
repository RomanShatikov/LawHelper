import axios from 'axios';
import type { ThunkActionCreater } from '../../../store';
import type { DocumentType } from '../../../../types/document/documentType';
import { setCurrentDocument } from './documentSlice';

export const getDocumentById: ThunkActionCreater<DocumentType['id'] | number> =
  (id) => (dispatch) => {
    axios<DocumentType>(`/document/${id}`)
      .then(({ data }) => dispatch(setCurrentDocument(data)))
      .catch((err) => console.error(err));
  };

export default getDocumentById;
