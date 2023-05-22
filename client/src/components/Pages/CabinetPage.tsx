import { Avatar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { UserType } from '../../types/user/userType';
import { LoggedType } from '../../types/user/userType';
import { QuestionType } from '../../types/questions/questionType';
import { getFavorites } from '../../features/redux/slices/questions/favoritesThunk';
import MediaCard from '../UI/MediaCard';
import { RequestType } from '../../types/request/requestType';
import { getRequests } from '../../features/redux/slices/request/requestThunk';
import Requests from '../UI/Requests';
import { Favorite } from '@mui/icons-material';
import Favorites from '../UI/Favorites';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

export default function CabinetPage(): JSX.Element {
  const user = useAppSelector<LoggedType>((state) => state.user);
  console.log(user);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <Avatar sx={{ bgcolor: '#1ebc6d' }}>
        {user?.firstName[0]}
        {user?.lastName[0]}
      </Avatar>
      <Typography>
        {user?.firstName} {user?.lastName}
      </Typography>
      <Button variant="contained" type="button" onClick={(e) => navigate('/cabinet/favorites')}>
        Избранное
      </Button>
      <Button variant="contained" type="button" onClick={(e) => navigate('/cabinet/requests')}>
        Предложения
      </Button>
      {location.pathname === '/cabinet/requests' ? <Requests /> : <Favorites />}
    </div>
  );
}
