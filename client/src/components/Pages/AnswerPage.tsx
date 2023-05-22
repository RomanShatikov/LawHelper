import usePagination from '@mui/material/usePagination/usePagination';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function AnswerPage(): {
  const { id } = useParams();
  return <div>Страница с вопросами</div>;
}
