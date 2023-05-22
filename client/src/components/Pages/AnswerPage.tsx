import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { Container } from 'reactstrap';
import { getDocumentById } from '../../features/redux/slices/documents/documentThunk';
import { getQuestionById } from '../../features/redux/slices/questions/questionsThunk';


export default function AnswerPage(): JSX.Element {
  const question = useAppSelector((state) => state.question.currentQuestion);
  const document = useAppSelector((state) => state.document.currentDocument);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(getQuestionById(id));
    dispatch(getDocumentById(id));
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
          <Typography gutterBottom variant="h5" component="div">
            {question?.id}
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
          {' '}
          Список документов по вопросу
          <a href={document?.urlDoc} download><Typography gutterBottom variant="h5" component="div">
            {document?.urlDoc}
          </Typography>
          </a>
          <Typography gutterBottom variant="h5" component="div">
            {document?.id}
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
