import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GradeIcon from '@mui/icons-material/Grade';
import { useLocation, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FunctionalButton from './FunctionalButton';

type MediaCardProps = {
  title?: string;
  id?: number;
  views?: number;
  feedback?: string;
};

export default function MediaCard({ title, id, views, feedback }: MediaCardProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
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
        {location.pathname !== '/cabinet/requests' && (
          <Button
            size="small"
            onClick={(e) =>
              views ? navigate(`/answer/${Number(id)}`) : navigate(`/theme/${Number(id)}`)
            }
          >
            Узнать больше
          </Button>
        )}
        <FunctionalButton id={id} pathname={location.pathname} />
      </CardActions>
    </Card>
  );
}
