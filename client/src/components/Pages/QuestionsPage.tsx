import React, { useEffect } from 'react';
import SearchInputQuest from '../UI/SearchInputQuest';
import { Button } from 'reactstrap';
import GradeIcon from '@mui/icons-material/Grade';
import { useAppDispatch, useAppSelector } from '../../features/hooks';

export default function QuestionsPage():JSX.Element {
  const [questions, setQuestions] = React.useState<any[]>(['dasfa', 'afaafdsa']);

  const dispatch = useAppDispatch();

  const { questions } = useAppSelector((state) => state.questions);

  useEffect(() => {
    dispatch(questionsThunk)
  });

  return (
    <>
      <form>
        <SearchInputQuest />
        <Button type="submit" variant="outlined">
          Найти
        </Button>
      </form>
      {questions.map((question) => (
        <div>
          <div>{question.title}</div>
          <Button type="button" variant="outlined">
            <GradeIcon />
          </Button>
        </div>
      ))}
      {/* <Chat /> */}
    </>
  );
}
