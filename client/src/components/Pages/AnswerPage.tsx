import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { getDocumentById } from '../../features/redux/slices/documents/documentThunk';
import { getQuestionById } from '../../features/redux/slices/questions/questionsThunk';
import Docs from '../UI/Docs';
import FunctionalButton from '../UI/FunctionalButton';

export default function AnswerPage(): JSX.Element {
  const question = useAppSelector((state) => state.question.currentQuestion);
  const document = useAppSelector((state) => state.document.documents);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams();

 

  React.useEffect(() => {
    dispatch(getQuestionById(id));
  }, []);

  React.useEffect(() => {
    dispatch(getDocumentById(id));
  }, []);

   console.log('0000000000', document);

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
          <FunctionalButton
            id={Number(id)}
            pathname={location.pathname}
            views={Number(question?.views)}
          />
        </CardActions>
      </Card>
      {document?.length !== 0 && <Docs id={id} />}
    </Container>
  );
}
