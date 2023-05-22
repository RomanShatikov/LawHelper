import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { LoggedType } from '../../types/user/userType';
import { QuestionType } from '../../types/questions/questionType';
import { getFavorites } from '../../features/redux/slices/questions/favoritesThunk';
import { Typography } from '@mui/material';
import MediaCard from './MediaCard';

export default function Favorites() {
  const user = useAppSelector<LoggedType>((state) => state.user);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector<QuestionType[]>((state) => state.question.favorites);
  useEffect(() => {
    dispatch(getFavorites(user.id));
  }, []);
  return (
    <div>
      <Typography>Ваши избранные вопросы</Typography>
      {favorites.map((favorite) => (
        <MediaCard
          key={favorite?.id}
          title={favorite?.Question?.title}
          views={favorite?.Question?.views}
          id={favorite?.Question?.id}
        />
      ))}
    </div>
  );
}
