import axios from 'axios';
import type { ThunkActionCreater } from '../../../store';
import type { ThemeType } from '../../../../types/theme/themeType';
import { setThemes } from './themeSlice';

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

export const getAllThemes: ThunkActionCreater = () => async (dispatch) => {
  axios<ThemeType[]>(`/allThemes`)
    .then(({ data }) => dispatch(setThemes(data)))
    .catch((err) => console.error(err));
};
