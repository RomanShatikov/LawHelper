import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { getQuestionById } from '../../features/redux/slices/questions/questionsThunk';
import { Container } from 'reactstrap';
import { DocumentType } from '../../types/document/documentType';
import { getDocumentById } from '../../features/redux/slices/documents/documentThunk';
import { QuestionType } from '../../types/questions/questionType';


export default function AnswerPage(): JSX.Element {
  const question = useAppSelector((state) => state.question.currentQuestion);
  const document = useAppSelector((state) => state.document.currentDocument);
  // console.log(question);
  console.log(document);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams();
  console.log('---answerpageID--', question?.id);
  console.log('---document---', document?.id);

  React.useEffect(() => {
    dispatch(getQuestionById(id));
    dispatch(getDocumentById(id));
    // dispatch(getQuestionById(+location.pathname.slice(-1)));
    // dispatch(getDocumentById(+location.pathname.slice(-1)));
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
