import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GradeIcon from '@mui/icons-material/Grade';
<<<<<<< HEAD
import { useLocation, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MediaCardFunction from './mediaCardFunction';

type MediaCardProps = {
  title: string;
  id: number;
  views?: string;
  feedback?: string;
};

export default function MediaCard({ title, id, views, feedback }: MediaCardProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
=======
import { useNavigate } from 'react-router-dom';
import type { QuestionType } from '../../types/questions/questionType';
import { useAppDispatch } from '../../features/hooks';
import { setCurrentQuestion } from '../../features/redux/slices/questions/questionsSlice';

type MediaCardProps = {
  question: QuestionType;
};

export default function MediaCard({ question }: MediaCardProps): JSX.Element {
  const addFavoritesHandler = (): void => {};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
>>>>>>> d98ecf9 (answercomponents)
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {question.title}
        </Typography>
        {views && (
          <div>
            <VisibilityIcon />
            <Typography gutterBottom variant="h6" component="div">
              {views}
            </Typography>
          </div>
        )}
        {feedback && (
          <Typography gutterBottom variant="h6" component="div">
            {feedback}
          </Typography>
        )}
      </CardContent>
      <CardActions>
<<<<<<< HEAD
        {location.pathname !== '/cabinet/requests' && (
          <Button
            size="small"
            onClick={(e) => (views ? navigate(`/answer/${id}`) : navigate(`/theme/${id}`))}
          >
            Узнать больше
          </Button>
        )}
        {}
        {location.pathname !== '/cabinet/requests' && (
          <Button size="small">
            <GradeIcon />
          </Button>
        )}
        {/* <MediaCardFunction/> */}
=======
        <Button
          size="small"
          onClick={() => {
            dispatch(setCurrentQuestion(question));
            question.views ? navigate(`/answer/${question.id}`) : navigate(`/theme/${question.id}`);
          }}
        >
          Узнать больше
        </Button>
        <Button size="small" onClick={addFavoritesHandler}>
          <GradeIcon />
        </Button>
>>>>>>> d98ecf9 (answercomponents)
      </CardActions>
    </Card>
  );
}
