import { CircularProgress } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../features/hooks';

type LoaderProps = {
  children: JSX.Element;
};

export default function Loader({ children }: LoaderProps): JSX.Element {
  const user = useAppSelector((store) => store.user);
  // if (user.status === 'guest') return <h1>LOADING...</h1>;
  if (user.status === 'fetching') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress/>
      </div>
    );
  }

  return children;
}
