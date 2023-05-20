import React, { useEffect } from 'react';
import SearchInputQuest from '../UI/SearchInputQuest';
import { Button } from 'reactstrap';
import Pagination from '@mui/material/Pagination';
import GradeIcon from '@mui/icons-material/Grade';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import {
  getFirstQuestions,
  getQuestionsByPage,
} from '../../features/redux/slices/questions/questionsThunk';
import { QuestionType } from '../../types/questions/questionType';
import { Stack } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MediaCard from '../UI/MediaCard';

export default function QuestionsPage(): JSX.Element {
  const questions = useAppSelector<QuestionType[]>((state) => state.question.questions);
  const [pageCount, setPageCount] = React.useState(1);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  console.log('-----------id', id);

  useEffect(() => {
    axios
      .post('/questionsPageCount', { id })
      .then((res) => setPageCount(res.data.pageCount))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    dispatch(getFirstQuestions(Number(id)));
  }, []);

  const paginationHandler = (e) => {
    const page = Number(e.target.textContent);
    dispatch(getQuestionsByPage(Number(id), page));
  };

  return (
    <>
      <form>
        <SearchInputQuest />
        <Button type="submit" variant="outlined">
          Найти
        </Button>
      </form>

      {pageCount ? <Pagination count={pageCount} onClick={(e) => paginationHandler(e)} /> : null}
      {questions?.map((question) => (
        <MediaCard
          key={question?.id}
          title={question?.title}
          id={question?.id}
          views={question?.views}
        />
      ))}
    </>
  );
}
