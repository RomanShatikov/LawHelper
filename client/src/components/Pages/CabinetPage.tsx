import { Avatar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useAppSelector } from '../../features/hooks';
import type { ActiveType, UserType } from '../../types/user/userType';
import Requests from '../UI/Requests';
import Favorites from '../UI/Favorites';
import UserModalWindow from '../UI/UserModalWindow';

export default function CabinetPage(): JSX.Element {
  const user = useAppSelector<UserType>((state) => state.user);

  console.log(user);
  const [showModal, setShowModal] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (user.status !== 'active') return <p />;

  return (
    <div>
      <div style={{ marginLeft: '12%',  marginTop: '30px' }}>
        <Avatar sx={{ bgcolor: '#3F88CC', width: '70px', height: '70px' }}>
          {user?.firstName[0]}
          {user?.lastName[0]}
        </Avatar>
        <Typography>
          {user?.firstName} {user?.lastName}
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button
          variant="contained"
          type="button"
          style={{
            backgroundColor: 'white',
            borderColor: 'white',
            color: '#3F88CC',
            margin: 'auto',
          }}
          onClick={(e) => setShowModal((prev) => !prev)}
        >
          Обратная связь
        </Button>
        {showModal && <UserModalWindow showModal={showModal} setShowModal={setShowModal} />}
        <Button
          variant="contained"
          type="button"
          style={{
            backgroundColor: 'white',
            borderColor: 'white',
            color: '#3F88CC',
            margin: 'auto',
          }}
          onClick={(e) => navigate('/cabinet/favorites')}
        >
          Избранное
        </Button>
        <Button
          variant="contained"
          type="button"
          style={{
            backgroundColor: 'white',
            borderColor: 'white',
            color: '#3F88CC',
            margin: 'auto',
          }}
          onClick={(e) => navigate('/cabinet/requests')}
        >
          Предложения
        </Button>
      </div>
      {location.pathname === '/cabinet/requests' ? <Requests /> : <Favorites />}
    </div>
  );
}
