import { Avatar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useAppSelector } from '../../features/hooks';
import type { ActiveType } from '../../types/user/userType';
import Requests from '../UI/Requests';
import Favorites from '../UI/Favorites';
import UserModalWindow from '../UI/UserModalWindow';

export default function CabinetPage(): JSX.Element {
  const user = useAppSelector<ActiveType>((state) => state.user);
  console.log(user);
  const [showModal, setShowModal] = useState<boolean>(false);
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
      <Button variant="contained" type="button" onClick={(e) => setShowModal((prev) => !prev)}>
        Обратная связь
      </Button>
      {showModal && <UserModalWindow showModal={showModal} setShowModal={setShowModal} />}
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
