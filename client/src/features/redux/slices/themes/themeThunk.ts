import axios from 'axios';
import type { ThunkActionCreater } from '../../../store';
import type { ThemeType } from '../../../../types/theme/themeType';
import { setThemes } from './themeSlice';

type GetFirstThemesProps = {
  title?: ThemeType['title'];
};

export const getFirstThemes: ThunkActionCreater<ThemeType['title']> =
  (title) => async (dispatch) => {
    if (title) {
      const res = await axios.post<ThemeType[]>('/firstThemes', { title });
      dispatch(setThemes(res.data));
    } else {
      const res = await axios.post<ThemeType[]>('/firstThemes');
      dispatch(setThemes(res.data));
    }
  };

type GetThemesByPageProps = {
  title?: ThemeType['title'];
  page?: number;
};

export const getThemesByPage: ThunkActionCreater<GetThemesByPageProps> =
  ({ title, page }) =>
  async (dispatch) => {
    if (title) {
      const res = await axios.post<ThemeType[]>('/paginationThemes', { title, page });
      dispatch(setThemes(res.data));
    } else {
      const res = await axios.post<ThemeType[]>('/paginationThemes', { page });
      dispatch(setThemes(res.data));
    }
  };

export const getAllThemes: ThunkActionCreater<null> = () => async (dispatch) => {
  const res = await axios.post<ThemeType[]>('/allThemes');
  dispatch(setThemes(res.data));
};
