import axios from 'axios';
import type { ThunkActionCreater } from '../../../store';
import { ThemeType } from '../../../../types/theme/themeType';
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

export const getThemesByPage: ThunkActionCreater<ThemeType['title'], number> =
  (title, page) => async (dispatch) => {
    if (title) {
      const res = await axios.post<ThemeType[]>('/paginationThemes', { title, page });
      dispatch(setThemes(res.data));
    } else {
      const res = await axios.post<ThemeType[]>('/paginationThemes', { page });
      dispatch(setThemes(res.data));
    }
  };



//   import axios from 'axios';
// import type { ThunkActionCreater } from '../../../store';
// import { ThemeType } from '../../../../types/theme/themeType';
// import { setThemes } from './themeSlice';

// export const getFirstThemes: ThunkActionCreater <ThemeType['title']>= (title) => async (dispatch) => {
//   if (title) {
// const res = await axios<ThemeType[]>.post('/firstThemes', title);
//  dispatch(setThemes(res.data));
//   } else {
    
//  const res = await axios<ThemeType[]>.post('/firstThemes');
//  dispatch(setThemes(res.data));
//   }
 
// };

// export const getThemesByPage: ThunkActionCreater<ThemeType['title'], number> =
//   (title, page) => async (dispatch) => {
//     if (title) {
//     const res = await axios.post<ThemeType[]>('/paginationThemes', { title, page });
//     dispatch(setThemes(res.data));
//     } else {
//     const res = await axios.post<ThemeType[]>('/paginationThemes', { page });
//     dispatch(setThemes(res.data));
//     }
//   };