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

export default function CabinetPage(): JSX.Element {
  const user = useAppSelector<LoggedType>((state) => state.user);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector<QuestionType[]>((state) => state.question.favorites);
  const requests = useAppSelector<RequestType[]>((state) => state.request.requests);
  console.log('---------', requests);
  useEffect(() => {
    dispatch(getFavorites(user.id));
    dispatch(getRequests(user.id));
  }, []);
  return (
    <div>
      <Avatar sx={{ bgcolor: '#1ebc6d' }}>
        {user?.firstName[0]}
        {user?.lastName[0]}
      </Avatar>
      <Typography>
        {user?.firstName} {user?.lastName}
      </Typography>
      <div>
        <Typography>Ваши избранные вопросы</Typography>
        {favorites.map((favorite) => (
          <MediaCard
            key={favorite?.id}
            title={favorite?.Question?.title}
            views={favorite?.Question?.views}
          />
        ))}
      </div>
      <div>
        <Typography>Ваши предложения</Typography>
        {requests.map((request) => (
          <MediaCard key={request?.id} title={request?.title} feedback={request?.feedback} />
        ))}
      </div>
    </div>
  );
}
