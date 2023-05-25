import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { getDocumentById } from '../../features/redux/slices/documents/documentThunk';
import { getQuestionById } from '../../features/redux/slices/questions/questionsThunk';
import Docs from '../UI/Docs';
import FunctionalButton from '../UI/FunctionalButton';
import YandexMap from '../UI/YandexMap';

export default function AnswerPage(): JSX.Element {
  const question = useAppSelector((state) => state.question.currentQuestion);
  const document = useAppSelector((state) => state.document.documents);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(getQuestionById(Number(id)));
  }, []);

  React.useEffect(() => {
    dispatch(getDocumentById(Number(id)));
  }, []);

  return (
    <Container>
      <Row>
        <Col md={4} className="mt-5 mb-4" style={{ marginBottom: '80px', marginRight: '200px' }}>
          <Card
            sx={{
              width: 450,
              height: 400,
              borderColor: '#16c0ce',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderRadius: '20px',
              fontSize: '1em',
            }}
          >
            {/* <CardMedia sx={{ height: 300 }} /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {question?.title}
              </Typography>
              <div>
                <VisibilityIcon />
                <Typography gutterBottom variant="h5" component="div">
                  {question?.views}
                </Typography>
              </div>
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
        </Col>
        <Col md={4} className="mt-5" style={{ marginBottom: '80px', marginRight: '40px' }}>
          <Card
            sx={{
              width: 300,
              height: 300,
              borderColor: '#16c0ce',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderRadius: '20px',
              fontSize: '1em',
            }}
          >
            {document?.length !== 0 && <Docs id={id} />}
          </Card>
        </Col>
      </Row>
      <Col
        md={4}
        className="mt-5"
        style={{
          marginBottom: '80px',
          position: 'absolute',
          bottom: 0,
          right: 0,
          marginRight: '10px',
        }}
      >
        <Card
          sx={{
            width: 300,
            height: 300,
            borderColor: '#16c0ce',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: '20px',
            fontSize: '1em',
          }}
        >
          {question && question.mark1 && question.mark2 && <YandexMap />}
        </Card>
      </Col>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia sx={{ height: 300 }} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {question?.title}
          </Typography>
          <div>
            <VisibilityIcon />
            <Typography gutterBottom variant="h5" component="div">
              {question?.views}
            </Typography>
          </div>
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
          />
        </CardActions>
      </Card>
      <Col>{question && question.mark1 && question.mark2 && <YandexMap />}</Col>
      {document?.length !== 0 && <Docs id={Number(id)} />}
    </Container>
  );
}
