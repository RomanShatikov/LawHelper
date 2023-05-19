import axios from 'axios';
import type { ThunkActionCreater } from '../../../store'
import { ThemeType } from '../../../../types/theme/themeType';
import { setThemes } from './themeSlice';

export const getFirstThemes: ThunkActionCreater = () => async (dispatch) => {
  const res = await axios<ThemeType[]>('/firstThemes');
  dispatch(setThemes(res.data));
};

export const getThemesByPage: ThunkActionCreater<ThemeType['id']> = (page) => async (dispatch) => {
  const res = await axios.post<ThemeType[]>('/paginationThemes', { page });
  dispatch(setThemes(res.data));
};
