/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-lone-blocks */
import React, { useEffect } from 'react';
import { Button } from 'reactstrap';
import GradeIcon from '@mui/icons-material/Grade';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import {
  appendFavorite,
  deleteFavorite,
  getFavorites,
} from '../../features/redux/slices/questions/favoritesThunk';
import type { UserType } from '../../types/user/userType';
import type { FavoriteType, FavoriteArg } from '../../types/favorite/favoriteType';

type FunctionalButtonProps = {
  pathname?: string;
  id?: number;
  views?: number;
};

export default function FunctionalButton({ pathname, id, views }: FunctionalButtonProps): JSX.Element {
  const user = useAppSelector<UserType>((state) => state.user);
  const favorites = useAppSelector<FavoriteType[]>((state) => state.question.favorites);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.status === 'active') dispatch(getFavorites(Number(user.id)));
  }, []);

  const addFavoriteHandler = (): void => {
    if (user.status === 'active') dispatch(appendFavorite({ userId: user.id, questionId: id }));
  };

  const deleteFavoriteHandler = (): void => {
    if (user.status === 'active')
      dispatch(deleteFavorite({ userId: user.id, questionId: id } as FavoriteArg));
  };

  if (user.status !== 'active') return <p> </p>;
   if (user.isAdmin) return <p> </p>;
   if (!views) return <p> </p>;

  if ( favorites.find((favorite) => favorite.questionId === id)) {
    return (
      <Button
        size="small"
        onClick={deleteFavoriteHandler}
        style={{ backgroundColor: 'transparent', border: 'none', color: '#fff' }}
      >
        <ClearIcon style={{ color: '#3F88CC' }} />
      </Button>
    );
  }
  if (pathname === '/cabinet/requests') return <p> </p>;

  return (
    <Button
      size="small"
      style={{ backgroundColor: 'transparent', border: 'none', color: '#fff' }}
      onClick={addFavoriteHandler}
    >
      <GradeIcon style={{ color: '#3F88CC' }} />
    </Button>
  );
}
