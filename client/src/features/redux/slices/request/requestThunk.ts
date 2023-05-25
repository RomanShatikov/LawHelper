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
export const deleteRequestThunk: ThunkActionCreater<RequestType['id']> =
  (requestId) => (dispatch) => {
    axios
      .delete(`/admin/request/${requestId}`)
      .then(() => dispatch(deleteRequest(requestId)))
      .catch(console.log);
  };
export const loadRequests: ThunkActionCreater = () => (dispatch) => {
  axios<RequestType[]>('/admin/')
    .then(({ data }) => dispatch(setRequest(data)))
    .catch(console.log);
};

type AddRequestProp = {
    userId: ActiveType['id'];
    title: string;
};

export const addRequest: ThunkActionCreater<AddRequestProp> = ({userId, title}) => async (dispatch) => {
  const res = await axios.post<RequestType>('/crud/request', {userId, title});
  dispatch(appendRequest(res.data));
};
