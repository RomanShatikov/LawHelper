import axios from 'axios';
import { LoggedType } from '../../../../types/user/userType';
import { ThunkActionCreater } from '../../../store';
import { QuestionType } from '../../../../types/questions/questionType';
import { setFavorites } from './questionsSlice';

export const getFavorites: ThunkActionCreater<LoggedType['id']> = (userId) => async (dispatch) => {
  const res = await axios<QuestionType[]>(`/favorites/${userId}`);
  dispatch(setFavorites(res.data));
};
