import axios from 'axios';
import type { ThunkActionCreater } from '../../../store';
import { addQuestion, setCurrentQuestion, setQuestions } from './questionsSlice';
import type { QuestionType } from '../../../../types/questions/questionType';

type GetFirstQuestionsProps = {
  id?: QuestionType['id'];
  title?: QuestionType['title'];
};

export const getFirstQuestions: ThunkActionCreater<GetFirstQuestionsProps> =
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

type GetQuestionsByPageProps = {
  id?: QuestionType['id'];
  page?: number;
  title?: QuestionType['title'];
};

export const getQuestionsByPage: ThunkActionCreater<GetQuestionsByPageProps> =
  ({ id, page, title }) =>
  async (dispatch) => {
    if (id) {
      const res = await axios.post<QuestionType[]>('/paginationQuestions', { id, page });
      dispatch(setQuestions(res.data));
    } else if (title) {
      const res = await axios.post<QuestionType[]>('/paginationQuestions', { title, page });
      dispatch(setQuestions(res.data));
    } else {
      const res = await axios.post<QuestionType[]>('/paginationQuestions', { page });
      dispatch(setQuestions(res.data));
    }
  };
export const submitQuestion: ThunkActionCreater<QuestionType> = (data) => async (dispatch) => {
  try {
    const response = await axios.post<QuestionType>('/admin/questions', data);
    const question = response.data;
    dispatch(addQuestion(question));
    console.log(question);
  } catch (error) {
    console.error('Error submitting question:', error);
  }
};

export const getQuestionById: ThunkActionCreater<QuestionType['id'] | number> =
  (id) => (dispatch) => {
    axios<QuestionType>(`/answer/${id}`)
      .then(({ data }) => dispatch(setCurrentQuestion(data)))
      .catch((err) => console.error(err));
  };
