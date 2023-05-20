import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type OneAnswerProps = {
  id: number;
  title: string;
  answer: string;
};

export default function OneAnswer({ answer, id, title }: OneAnswerProps): JSX.Element {
  const addFavoritesHandler = (): void => {};
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {answer}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={addFavoritesHandler}>
          Добавить в избранное
        </Button>
      </CardActions>
    </Card>
  );
}
