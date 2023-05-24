import axios from 'axios';
import type { ActiveType } from '../../../../types/user/userType';
import { ThunkActionCreater } from '../../../store';
import { QuestionType } from '../../../../types/questions/questionType';
import { addFavorite, delFavorite, setFavorites } from './questionsSlice';
import type { FavoriteType } from '../../../../types/favorite/favoriteType';

export const getFavorites: ThunkActionCreater<ActiveType['id']> = (userId) => async (dispatch) => {
  const res = await axios<FavoriteType[]>(`/favorites/${userId}`);
  dispatch(setFavorites(res.data));
};

type AppendFavoriteArg = {
  userId: number;
  questionId: number;
};

export const appendFavorite: ThunkActionCreater<AppendFavoriteArg> =
  ({ userId, questionId }) =>
  async (dispatch) => {
    console.log(userId, questionId, '--------------');
    const res = await axios.post<FavoriteType>(`/crud/favorite`, { userId, questionId });
    if (res.status === 200) dispatch(addFavorite(res.data));
  };

export type DelFavoriteArg = {
  userId: number;
  questionId: number;
};

export const deleteFavorite: ThunkActionCreater<DelFavoriteArg> =
  ({ userId, questionId }) =>
  async (dispatch) => {
    console.log('000000000', userId, questionId);
    const res = await axios.post<FavoriteType>(`/crud/delFavorite`, { userId, questionId });
    if (res.status === 200) dispatch(delFavorite({ userId, questionId }));
  };
