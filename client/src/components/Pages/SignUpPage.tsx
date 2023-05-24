import React from 'react';
import SignUpForm from '../UI/SignUpForm';
import { useAppSelector } from '../../features/hooks';

export default function SignUpPage(): JSX.Element {
  const user = useAppSelector((state) => state.user);
  return (
    <>
      <SignUpForm />
      {user.status === 'non-active' && <p>Подтвердите почту</p>}
    </>
  );
}
