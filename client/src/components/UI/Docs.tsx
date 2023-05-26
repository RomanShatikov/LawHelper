import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';
import { useAppDispatch, useAppSelector } from '../../features/hooks';

type DocCardProps = {
  url?: string;
  id?: number;
};
export default function DocCard({ url, id }: DocCardProps): JSX.Element {
  const localhost = 'http://localhost:5173/';
  const documents = useAppSelector((state) => state.document.documents);
  const dispatch = useAppDispatch();
  const location = useLocation();
  console.log(location);
  console.log('---ddd----', id);
  const downloadDoc = async (urlDoc: string) => {
    const filename = urlDoc.split('/').pop();
    window.location.href = `http://localhost:3001/api/admin/downloads/${filename}`;
  };

  return (
    <div style={{ maxHeight: 'max-content', maxWidth: 'max-content', margin: 0 }}>
      <Typography gutterBottom variant="h5" component="div">
        Документы
      </Typography>
      {documents.map((document) => (
        <Card key={document.id}>
          <CardMedia />
          <CardContent>
            <div>
              <ArticleIcon
                style={{ color: '#3F88CC' }}
                onClick={() => downloadDoc(document.urlDoc)}
              />
              <a href={document.urlDoc} download>
                <Typography gutterBottom variant="h5" component="div">
                  {`${document.title.slice(0, 20)}...`}
                </Typography>
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
