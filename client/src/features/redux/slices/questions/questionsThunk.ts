import axios from 'axios';
import type { ThunkActionCreater } from '../../../store';
import { setQuestions } from './questionsSlice';
import { QuestionType } from '../../../../types/questions/questionType';

export const getFirstQuestions: ThunkActionCreater<QuestionType['id'] | QuestionType['title']> =
  (id, title) => async (dispatch) => {
    if (id) {
      console.log('------id-----', id);
      const res = await axios<QuestionType[]>(`/firstQuestionsById/${id}`);
      dispatch(setQuestions(res.data));
    } else if (title) {
      console.log('------title-----', title);
      const res = await axios<QuestionType[]>(`/firstQuestionsByTitle/${title}`);
      console.log('------------res', res.data);
      dispatch(setQuestions(res.data));
    } else {
      console.log('------nothing-----');
      const res = await axios<QuestionType[]>('/firstQuestions');
      dispatch(setQuestions(res.data));
    }
  };

export const getQuestionsByPage: ThunkActionCreater<QuestionType['id'] | number> =
  (id, page, title) => async (dispatch) => {
    if (id) {
      console.log('------id-----', id);
      const res = await axios.post<QuestionType[]>('/paginationQuestions', { id, page });
      dispatch(setQuestions(res.data));
    } else if (title) {
      console.log('------title-----', title);
      const res = await axios.post<QuestionType[]>('/paginationQuestions', { title, page });
      dispatch(setQuestions(res.data));
    } else {
      console.log('------nothing-----');
      const res = await axios.post<QuestionType[]>('/paginationQuestions', { page });
      dispatch(setQuestions(res.data));
    }
  };
