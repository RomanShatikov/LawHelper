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
import { Row } from 'reactstrap';

export default function QuestionsPage(): JSX.Element {
  const questions = useAppSelector<QuestionType[]>((state) => state.question.questions);
  const [pageCount, setPageCount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
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

  const paginationHandler = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    dispatch(getQuestionsByPage(Number(id), page, title));
  };

  return (
    <>
      <SearchInputQuest />
      {pageCount ? (
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={paginationHandler}
          // onClick={(e) => paginationHandler(e)}
        />
      ) : null}
      <div className="question-list">
        {questions.length ? (
          <Row>
            {questions.map((question) => (
              <MediaCard
                key={question?.id}
                title={question?.title}
                id={question?.id}
                views={question?.views}
                answer={question?.answer}
              />
            ))}
          </Row>
        ) : (
          <p>Тут ничего нет, попробуйте поискать другую тему</p>
        )}
      </div>
    </>
  );
}
