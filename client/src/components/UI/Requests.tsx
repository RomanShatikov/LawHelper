import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { getRequests } from '../../features/redux/slices/request/requestThunk';
import MediaCard from './MediaCard';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import type { RequestType } from '../../types/request/requestType';
import type { ActiveType, UserType } from '../../types/user/userType';

export default function Requests(): JSX.Element {
  const user = useAppSelector<UserType>((state) => state.user);
  const dispatch = useAppDispatch();
  const requests = useAppSelector<RequestType[]>((state) => state.request.requests);
  useEffect(() => {
    if (user.status === 'active') dispatch(getRequests(user.id));
  }, []);

  return (
    <div>
      <Typography>Ваши предложения</Typography>
      {requests.map((request) => (
        <MediaCard key={request?.id} title={request?.title} feedback={request?.feedback} />
      ))}
    </div>
  );
}
