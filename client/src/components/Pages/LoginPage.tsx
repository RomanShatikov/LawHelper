import React from 'react';
import LoginForm from '../UI/LoginForm';
import { useAppSelector } from '../../features/hooks';

export default function LoginPage(): JSX.Element {
  const user = useAppSelector((state) => state.user);
  return (
    <>
      <LoginForm />
      {user.status === 'non-active' && <p>Подтвердите почту</p>}
    </>
  );
}
