import axios from 'axios';
import type {  LoginForm, SignUpForm, SignUpFormType } from '../../../../types/user/formTypes';
import type { UserFromBackend } from '../../../../types/user/userType';
import type { ThunkActionCreater } from '../../../store'; 
import { logoutUser, setUser } from './userSlice';

export const signUpThunk: ThunkActionCreater<SignUpFormType> = (formData) => (dispatch) => {
  axios
    .post<UserFromBackend>('/auth/signup', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    })
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch(console.log);
};

export const loginUserThunk: ThunkActionCreater<LoginForm> = (formData) => (dispatch) => {
    axios
      .post<UserFromBackend>('/auth/login', formData)
      .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
      .catch(console.log);
  };

export const checkUserThunk: ThunkActionCreater = () => (dispatch) => {
  axios
    .get<UserFromBackend>('/auth/check')
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch(() => dispatch(logoutUser()));
};

export const logoutThunk: ThunkActionCreater = () => (dispatch) => {
  axios
    .get('/auth/logout')
    .then(() => dispatch(logoutUser()))
    .catch((err)=>console.log(err));
};

