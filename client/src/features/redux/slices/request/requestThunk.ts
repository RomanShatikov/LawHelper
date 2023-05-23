import axios from 'axios';
import { LoggedType } from '../../../../types/user/userType';
import { ThunkActionCreater } from '../../../store';
import { RequestType } from '../../../../types/request/requestType';
import { appendRequest, setRequest } from './requestSlice';

export const getRequests: ThunkActionCreater<LoggedType['id']> = (userId) => async (dispatch) => {
  const res = await axios<RequestType[]>(`/requests/${userId}`);
  dispatch(setRequest(res.data));
};

export const addRequest: ThunkActionCreater<RequestType> = (request) => async (dispatch) => {
  const res = await axios.post<RequestType>('/crud/request',  request );
  console.log('-----------', res.data);
  dispatch(appendRequest(res.data));
};
