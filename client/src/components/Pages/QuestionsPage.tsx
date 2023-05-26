import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import GradeIcon from '@mui/icons-material/Grade';
import { Stack } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import SearchInputQuest from '../UI/SearchInputQuest';
import type { QuestionType } from '../../types/questions/questionType';
import {
  getFirstQuestions,
  getQuestionsByPage,
} from '../../features/redux/slices/questions/questionsThunk';
import MediaCard from '../UI/MediaCard';

export default function QuestionsPage(): JSX.Element {
  const questions = useAppSelector<QuestionType[]>((state) => state.question.questions);
  const [pageCount, setPageCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const dispatch = useAppDispatch();
  const { id, title } = useParams();

  useEffect(() => {
    axios
      .post('/questionsPageCount', { id, title })
      .then((res) => setPageCount(Number(res?.data?.pageCount)))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .post('/questionsPageCount', { id, title })
      .then((res) => setPageCount(Number(res?.data?.pageCount)))
      .catch((err) => console.log(err));
  }, [title]);

  useEffect(() => {
    dispatch(getFirstQuestions({ id: Number(id), title }));
  }, []);

  useEffect(() => {
    dispatch(getFirstQuestions({ id: Number(id), title }));
  }, [title]);

  const paginationHandler = (e: React.ChangeEvent<unknown>, page: number): void => {
    setCurrentPage(page);
    dispatch(getQuestionsByPage({ id: Number(id), page, title }));
  };

  return (
    <>
      <div style={{ margin: 'auto', width: '70%',  }}>
        <SearchInputQuest />
      </div>

      {pageCount ? (
        <Pagination
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1%', justifyContent: 'center', marginTop: '20px' }}
          color="primary"
          count={pageCount}
          page={currentPage}
          onChange={paginationHandler}
          // onClick={(e) => paginationHandler(e)}
        />
      ) : null}
      <div className="question-list">
        {questions.length ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1%', justifyContent: 'center', margin: '0', padding: '0' }}>
            {questions.map((question) => (
              <MediaCard
                key={question?.id}
                title={question?.title}
                id={question?.id}
                views={Number(question?.views)}
                answer={question?.answer}
              />
            ))}
          </div>
        ) : (
          <p>Тут ничего нет, попробуйте поискать другую тему</p>
        )}
      </div>
    </>
  );
}
