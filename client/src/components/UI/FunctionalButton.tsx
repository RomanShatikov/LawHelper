import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import {
  appendFavorite,
  deleteFavorite,
  getFavorites,
} from '../../features/redux/slices/questions/favoritesThunk';
import { LoggedType } from '../../types/user/userType';
import { FavoriteType } from '../../types/favorite/favoriteType';
import GradeIcon from '@mui/icons-material/Grade';
import ClearIcon from '@mui/icons-material/Clear';

type FunctionalButtonProps = {
  pathname: string;
  id: number;
  views: number;
};

export default function FunctionalButton({ pathname, id, views }: FunctionalButtonProps) {
  const user = useAppSelector<LoggedType>((state) => state.user);
  const favorites = useAppSelector<FavoriteType>((state) => state.question.favorites);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  console.log(favorites);
  console.log(
    '0000000',
    favorites.find((favorite) => {
      // console.log(favorite.questionId);
      // console.log('----------', id);
      console.log(favorite.questionId === id);
    }),
  );

  useEffect(() => {
    dispatch(getFavorites(user.id));
  }, []);

  const addFavoriteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(appendFavorite({ userId: user.id, questionId: id }));
  };

  const deleteFavoriteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(deleteFavorite({ userId: user.id, questionId: id }));
  };

  if (
    favorites.find((favorite) => favorite.questionId === id)
  ) {
    return (
      <Button size="small" onClick={deleteFavoriteHandler}>
        <ClearIcon />
      </Button>
    );
  } else if (pathname === '/cabinet/requests') {
    return;
    {
      ('');
    }
  } else {
    return (
      <Button size="small" onClick={addFavoriteHandler}>
        <GradeIcon />
      </Button>
    );
  }
}
