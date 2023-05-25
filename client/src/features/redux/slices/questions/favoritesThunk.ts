import axios from 'axios';
import type { ActiveType } from '../../../../types/user/userType';
import type { ThunkActionCreater } from '../../../store';
import { addFavorite, delFavorite, setFavorites } from './questionsSlice';
import type { FavoriteArg, FavoriteType } from '../../../../types/favorite/favoriteType';

export const getFavorites: ThunkActionCreater<ActiveType['id']> = (userId) => async (dispatch) => {
  const res = await axios<FavoriteType[]>(`/favorites/${userId}`);
  dispatch(setFavorites(res.data));
};

export const appendFavorite: ThunkActionCreater<FavoriteArg> =
  ({ userId, questionId }) =>
  async (dispatch) => {
    const res = await axios.post<FavoriteType>(`/crud/favorite`, { userId, questionId });
    if (res.status === 200) dispatch(addFavorite(res.data));
  };

export const deleteFavorite: ThunkActionCreater<FavoriteArg> =
  ({ userId, questionId }) =>
  async (dispatch) => {
    const res = await axios.post<FavoriteType>(`/crud/delFavorite`, { userId, questionId });
    if (res.status === 200) dispatch(delFavorite({ userId, questionId }));
  };
