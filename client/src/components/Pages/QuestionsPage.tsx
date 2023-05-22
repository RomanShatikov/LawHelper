import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import SearchInputQuest from '../UI/SearchInputQuest';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import {
  getFirstQuestions,
  getQuestionsByPage,
} from '../../features/redux/slices/questions/questionsThunk';
import type { QuestionType } from '../../types/questions/questionType';
import MediaCard from '../UI/MediaCard';

type PageCountFromBackend = {
  pageCount: number;
};

export default function QuestionsPage(): JSX.Element {
  const questions = useAppSelector<QuestionType[]>((state) => state.question.questions);
  const [pageCount, setPageCount] = React.useState<number>(0);
  const dispatch = useAppDispatch();
  const { id, title } = useParams();

  useEffect(() => {
    axios
      .post<PageCountFromBackend>('/questionsPageCount', { id, title })
      .then((res) => setPageCount(res.data.pageCount))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .post<PageCountFromBackend>('/questionsPageCount', { id, title })
      .then((res) => setPageCount(res.data.pageCount))
      .catch((err) => console.log(err));
  }, [title]);

  useEffect(() => {
    dispatch(getFirstQuestions({ id: Number(id), title }));
  }, []);

  useEffect(() => {
    dispatch(getFirstQuestions({ id: Number(id), title }));
  }, [title]);

  const paginationHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const target = e.target as HTMLElement;
    const page = Number(target.textContent);
    dispatch(getQuestionsByPage({ id: Number(id), page, title }));
  };

  return (
    <>
      <SearchInputQuest />
      {pageCount ? <Pagination count={pageCount} onClick={paginationHandler} /> : null}
      {questions.length ? (
        questions?.map((question) => <MediaCard key={question?.id} question={question} />)
      ) : (
        <p>Тут ничего нет, попробуйте поискать другую тему</p>
      )}
    </>
  );
}
