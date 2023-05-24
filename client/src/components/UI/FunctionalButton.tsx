import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import type { FavoriteType } from '../../types/favorite/favoriteType';


type FunctionalButtonProps = {
  pathname: string;
  id: number;
  views?: number;
};

export default function FunctionalButton({ pathname, id, views }: FunctionalButtonProps):JSX.Element  {
  const user = useAppSelector<UserType>((state) => state.user);
  if(user.status !== 'active') return (<div>Error</div>)
  const favorites = useAppSelector<FavoriteType[]>((state) => state.question.favorites);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFavorites(user.id));
  }, []);

  const addFavoriteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
    dispatch(appendFavorite({ userId: user.id, questionId: id }));
  };

  const deleteFavoriteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) :void => {
    dispatch(deleteFavorite({ userId: user.id, questionId: id }));
  };

  if (user.status !== 'active') return;

  if (favorites.find((favorite) => favorite.questionId === id)) {
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
