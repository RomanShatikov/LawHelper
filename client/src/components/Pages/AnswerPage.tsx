import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { getQuestionById } from '../../features/redux/slices/questions/questionsThunk';
import { Container } from 'reactstrap';
import { DocumentType } from '../../types/document/documentType';

export default function AnswerPage(): JSX.Element {
  const question = useAppSelector((state) => state.question.currentQuestion);
  const document = useAppSelector((state) => state.document.сurrentDocument);
  const dispatch = useAppDispatch();
  const location = useLocation();

  React.useEffect(() => {
    dispatch(getQuestionById(+location.pathname.slice(-1)));
  }, []);

  const addFavoritesHandler = (): void => {};

  return (
    <Container>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia sx={{ height: 300 }} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {question?.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {question?.answer}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={addFavoritesHandler}>
            Добавить в избранное
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia sx={{ height: 100 }} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {question?.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {question?.answer}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={addFavoritesHandler}>
            Просмотреть документ
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
