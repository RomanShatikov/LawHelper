import React, { useEffect } from 'react';
import SearchInputQuest from '../UI/SearchInputQuest';
import { Button } from 'reactstrap';
import GradeIcon from '@mui/icons-material/Grade';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { getAllQuestions } from '../../features/redux/slices/questions/questionsThunk';
import { QuestionType } from '../../types/questions/questionType';

export default function QuestionsPage(): JSX.Element {
  const questions = useAppSelector<QuestionType[]>((state) => state.question.questions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllQuestions());
  }, []);

  return (
    <>
      <div>
        <SearchInputQuest />
        <Button type="submit" variant="outlined">
          Найти
        </Button>
      </div>
      {questions?.map((question) => (
        <div key={question?.title}>
          <div>{question?.title}</div>
          <Button type="button" variant="outlined">
            <GradeIcon />
          </Button>
        </div>
      ))}
    </>
  );
}
