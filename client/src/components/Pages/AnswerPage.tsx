import React from 'react';
import { Button } from 'reactstrap';
import Pagination from '@mui/material/Pagination';
import { QuestionType } from '../../types/questions/questionType';
import OneAnswer from '../UI/OneAnswer';

export default function AnswerPage(): JSX.Element {
  // const questions = useAppSelector<QuestionType[]>((state) => state.question.questions);

  return (
      <OneAnswer />
  );
}
