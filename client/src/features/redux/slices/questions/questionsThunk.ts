import axios from 'axios';
import type { ThunkActionCreater } from '../../../store';
import { setQuestions } from './questionsSlice';
import { QuestionType } from '../../../../types/questions/questionType';

export const getAllQuestions: ThunkActionCreater = () => async (dispatch) => {
  const res = await axios<QuestionType[]>('/questions');
  dispatch(setQuestions(res.data));
};
