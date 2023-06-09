import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import type { ActiveType, UserType } from '../../types/user/userType';
import { getFavorites } from '../../features/redux/slices/questions/favoritesThunk';

import MediaCard from './MediaCard';
import type { FavoriteType } from '../../types/favorite/favoriteType';

export default function Favorites(): JSX.Element {
  const user = useAppSelector<UserType>((state) => state.user);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector<FavoriteType[]>((state) => state.question.favorites);
  {
    user.status === 'active' &&
      useEffect(() => {
        dispatch(getFavorites(user.id));
      }, []);
  }

  return (
    <div
      style={{
        margin: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        marginTop: '20px',
      }}
    >
      <Typography style={{ margin: 'auto' }}>Ваши избранные вопросы</Typography>
      {favorites.map((favorite) => (
        <MediaCard
          key={favorite?.id}
          title={favorite?.Question?.title}
          views={Number(favorite?.Question?.views)}
          id={favorite?.Question?.id}
        />
      ))}
    </div>
  );
}
