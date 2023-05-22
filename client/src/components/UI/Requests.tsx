import React, { useEffect } from 'react';
import { getRequests } from '../../features/redux/slices/request/requestThunk';
import MediaCard from './MediaCard';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { RequestType } from '../../types/request/requestType';
import { LoggedType } from '../../types/user/userType';

export default function Requests() {
  const user = useAppSelector<LoggedType>((state) => state.user);
  const dispatch = useAppDispatch();
  const requests = useAppSelector<RequestType[]>((state) => state.request.requests);
  useEffect(() => {
    dispatch(getRequests(user.id));
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
