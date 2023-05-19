import axios from 'axios';
import type { ThunkActionCreater } from '../../../store';
import { setQuestions } from './questionsSlice';
import { QuestionType } from '../../../../types/questions/questionType';

export const getFirstQuestions: ThunkActionCreater = () => async (dispatch) => {
  const res = await axios<QuestionType[]>('/firstQuestions');
  dispatch(setQuestions(res.data));
};

export const getQuestionsByPage: ThunkActionCreater<number> = (page) => async (dispatch) => {
  console.log('dfadfafda');
  console.log('page', page);
  const res = await axios.post<QuestionType[]>('/paginationQuestions', { page });
  console.log('res.data', res.data);
  dispatch(setQuestions(res.data));
};
