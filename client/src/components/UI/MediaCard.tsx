import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GradeIcon from '@mui/icons-material/Grade';
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
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {question.title}
        </Typography>
      </CardContent>
      <CardActions>
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
      </CardActions>
    </Card>
  );
}
