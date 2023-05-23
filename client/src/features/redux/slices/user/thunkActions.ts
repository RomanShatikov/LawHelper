import type { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import type { LoginForm, SignUpFormType } from '../../../../types/user/formTypes';
import type { UserFromBackend } from '../../../../types/user/userType';
import type { ThunkActionCreater } from '../../../store';
import { logoutUser, setUser } from './userSlice';
import { setEmailEror, setPasswordEror } from '../erors/erorsSlice';

export const signUpThunk: ThunkActionCreater<SignUpFormType> = (formData) => (dispatch) => {
  axios
    .post<UserFromBackend>('/auth/signup', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    })
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch((err)=>{
      if (err?.response?.data?.message === 'e-mail уже зарегистрирован') dispatch(setEmailEror(err?.response?.data?.message));
    });
};

type ErorFromBackend = {
  response: {
    data:{
      message: string
    }
  }
}
const a = 1

export const loginUserThunk: ThunkActionCreater<LoginForm> = (formData) => (dispatch) => {
  axios
    .post<UserFromBackend>('/auth/login', formData)
    .then(({ data }) => dispatch(setUser({ ...data, status: 'logged' })))
    .catch((err: ErorFromBackend) => {
      if (err?.response?.data?.message === 'e-mail не зарегистрирован')
        dispatch(setEmailEror(err?.response?.data?.message));
      if (err?.response?.data?.message === 'Неверный пароль') dispatch(setPasswordEror(err?.response?.data?.message));
    });
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
    .catch((err) => console.log(err));
};
