import axios from 'axios';
import type { ThunkActionCreater } from '../../../store';
import type { ThemeType } from '../../../../types/theme/themeType';
import { setThemes } from './themeSlice';

type GetFirstThemesArg = {
  title?: ThemeType['title'];
};

export const getFirstThemes: ThunkActionCreater<GetFirstThemesArg> =
  ({ title }) =>
  async (dispatch) => {
    const res = await axios.post<ThemeType[]>('/firstThemes', { title });
    dispatch(setThemes(res.data));
    // if (title) {
    //   const res = await axios.post<ThemeType[]>('/firstThemes', { title });
    //   dispatch(setThemes(res.data));
    // } else {
    //   const res = await axios.post<ThemeType[]>('/firstThemes');
    //   dispatch(setThemes(res.data));
    // }
  };

type GetThemesByPageArg = {
  page?: number;
  title?: ThemeType['title'];
};

export const getThemesByPage: ThunkActionCreater<GetThemesByPageArg> =
  ({ title, page }) =>
  async (dispatch) => {
    const res = await axios.post<ThemeType[]>('/paginationThemes', { title, page });
    dispatch(setThemes(res.data));
    // if (title) {
    //   const res = await axios.post<ThemeType[]>('/paginationThemes', { title, page });
    //   dispatch(setThemes(res.data));
    // } else {
    //   const res = await axios.post<ThemeType[]>('/paginationThemes', { page });
    //   dispatch(setThemes(res.data));
    // }
  };

