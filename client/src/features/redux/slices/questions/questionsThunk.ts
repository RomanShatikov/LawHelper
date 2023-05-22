import axios from 'axios';
import type { ThunkActionCreater } from '../../../store';
import { setQuestions } from './questionsSlice';
import type { QuestionType } from '../../../../types/questions/questionType';

type GetFirstQuestionsArg = {
  id?: QuestionType['id'];
  page?: number;
  title?: QuestionType['title'];
};

export const getFirstQuestions: ThunkActionCreater<GetFirstQuestionsArg> =
  ({ id, title }) =>
  async (dispatch) => {
    if (id) {
      const res = await axios<QuestionType[]>(`/firstQuestionsById/${id}`);
      dispatch(setQuestions(res.data));
    } else if (title) {
      const res = await axios<QuestionType[]>(`/firstQuestionsByTitle/${title}`);
      dispatch(setQuestions(res.data));
    } else {
      const res = await axios<QuestionType[]>('/firstQuestions');
      dispatch(setQuestions(res.data));
    }
  };

type GetQuestionsByPageThunkArg = {
  id?: QuestionType['id'];
  page?: number;
  title?: QuestionType['title'];
};

export const getQuestionsByPage: ThunkActionCreater<GetQuestionsByPageThunkArg> =
  ({ id, page, title }) =>
  async (dispatch) => {
    const res = await axios.post<QuestionType[]>('/paginationQuestions', { id, page, title });
    dispatch(setQuestions(res.data));
    // if (id) {
    //   const res = await axios.post<QuestionType[]>('/paginationQuestions', { id, page });
    //   dispatch(setQuestions(res.data));
    // } else if (title) {
    //   const res = await axios.post<QuestionType[]>('/paginationQuestions', { title, page });
    //   dispatch(setQuestions(res.data));
    // } else {
    //   const res = await axios.post<QuestionType[]>('/paginationQuestions', { page });
    //   dispatch(setQuestions(res.data));
    // }
  };
