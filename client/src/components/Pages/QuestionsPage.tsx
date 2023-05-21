import React, { useEffect } from 'react';
import SearchInputQuest from '../UI/SearchInputQuest';
import Button from '@mui/material/Button';
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
  const { id, title } = useParams();

  useEffect(() => {
    axios
      .post('/questionsPageCount', { id, title })
      .then((res) => setPageCount(res.data.pageCount))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .post('/questionsPageCount', { id, title })
      .then((res) => setPageCount(res.data.pageCount))
      .catch((err) => console.log(err));
  }, [title]);

  useEffect(() => {
    dispatch(getFirstQuestions(Number(id), title));
  }, []);

  useEffect(() => {
    dispatch(getFirstQuestions(Number(id), title));
  }, [title]);

  const paginationHandler = (e) => {
    const page = Number(e.target.textContent);
    dispatch(getQuestionsByPage(Number(id), page, title));
  };

  return (
    <>
      <SearchInputQuest />
      {pageCount ? <Pagination count={pageCount} onClick={(e) => paginationHandler(e)} /> : null}
      {questions?.map((question) => (
        <MediaCard
          key={question?.id}
         question={question}
        />
      ))}
    </>
  );
}
