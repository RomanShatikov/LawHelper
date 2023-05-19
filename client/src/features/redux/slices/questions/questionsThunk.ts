import axios from 'axios';
import type { ThunkActionCreater } from '../../../store';
import { setQuestions } from './questionsSlice';
import { QuestionType } from '../../../../types/questions/questionType';

export const getFirstQuestions: ThunkActionCreater = () => async (dispatch) => {
  const res = await axios<QuestionType[]>('/firstQuestions');
  dispatch(setQuestions(res.data));
};

export const getQuestionsByPage: ThunkActionCreater<QuestionType['id']> =
  (page) => async (dispatch) => {
    const res = await axios.post<QuestionType[]>('/paginationQuestions', { page });
    dispatch(setQuestions(res.data));
  };
