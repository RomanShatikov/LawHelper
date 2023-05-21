import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GradeIcon from '@mui/icons-material/Grade';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

type MediaCardProps = {
  title: string;
  id: number;
  views: number;
};

export default function MediaCard({ title, id, views }: MediaCardProps) {
  const addFavoritesHandler = () => {};
  const navigate = useNavigate();
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
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={(e) => (views ? navigate(`/answer/${id}`) : navigate(`/theme/${id}`))}
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
