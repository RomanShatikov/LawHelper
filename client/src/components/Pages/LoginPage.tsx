import React from 'react';
import LoginForm from '../UI/LoginForm';
import { useAppSelector } from '../../features/hooks';
import type { UserType } from '../../types/user/userType';

export default function LoginPage(): JSX.Element {
  const user = useAppSelector<UserType>((state) => state.user);

  return (
    <>
      <LoginForm />
    </>
  );
}
