import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0',
      }}
    >
      <Row>
        <Col
          style={{
            maxWidth: '60%',
            minHeight: 'max-content',
            margin: '0',
            padding: '0',
          }}
          className="mt-5 mb-4"
        >
          <Card>
            <CardContent style={{ fontSize: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ marginRight: '10px' }}
                >
                  {question?.title}
                </Typography>
                <VisibilityIcon style={{ color: '#3F88CC', height: '20px', width: '20px' }} />
                <Typography gutterBottom variant="h5" component="div">
                  {question?.views}
                </Typography>
              </div>
              <Typography gutterBottom variant="h5" style={{ fontSize: '18px' }} component="div">
                Решение:
              </Typography>
              <Typography gutterBottom variant="h5" style={{ fontSize: '15px' }} component="div">
                {question?.answer}
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
        <Col md={4} className="mt-5">
          {document?.length !== 0 && <Docs id={Number(id)} />}
        </Col>
      </Row>
      <Col md={4} className="mt-5">
        {question && question.mark1 && question.mark2 && <YandexMap />}
      </Col>
    </Container>
  );
}
