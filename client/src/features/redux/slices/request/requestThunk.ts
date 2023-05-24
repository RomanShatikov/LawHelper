import axios from 'axios';
import type { ActiveType } from '../../../../types/user/userType';
import type { ThunkActionCreater } from '../../../store';
import type { RequestType } from '../../../../types/request/requestType';
import { deleteRequest, appendRequest, setRequest } from './requestSlice';

// eslint-disable-next-line import/prefer-default-export
export const getRequests: ThunkActionCreater<ActiveType['id']> = (userId) => async (dispatch) => {
  const res = await axios<RequestType[]>(`/requests/${userId}`);
  dispatch(setRequest(res.data));
};
export const deleteRequestThunk: ThunkActionCreater<RequestType['id']> = (requestId) => (dispatch) => {
  axios
    .delete(`/admin/request/${requestId}`)
    .then(() => dispatch(deleteRequest(requestId)))
    .catch(console.log)
};
export const loadRequests: ThunkActionCreater = () => (dispatch) => {
  axios<RequestType[]>('/admin/')
    .then(({ data }) => dispatch(setRequest(data)))
    .catch(console.log);
}

export const addRequest: ThunkActionCreater<RequestType> = (request) => async (dispatch) => {
  const res = await axios.post<RequestType>('/crud/request',  request );
  console.log('-----------', res.data);
  dispatch(appendRequest(res.data));
};
