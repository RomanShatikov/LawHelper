import axios from 'axios';
import type { ThunkActionCreater } from '../../../store';
import { setQuestions } from './questionsSlice';
import { QuestionType } from '../../../../types/questions/questionType';

export const getFirstQuestions: ThunkActionCreater<number> = (id) => async (dispatch) => {
  if (id) {
    const res = await axios<QuestionType[]>(`/firstQuestions/${id}`);
    dispatch(setQuestions(res.data));
  } else {
    const res = await axios<QuestionType[]>('/firstQuestions');
    dispatch(setQuestions(res.data));
  }
};

export const getQuestionsByPage: ThunkActionCreater<QuestionType['id']> =
  (id, page) => async (dispatch) => {
    if (id) {
      const res = await axios.post<QuestionType[]>('/paginationQuestions', { id, page });
      dispatch(setQuestions(res.data));
    } else {
      const res = await axios.post<QuestionType[]>('/paginationQuestions', { page });
      dispatch(setQuestions(res.data));
    }
  };
