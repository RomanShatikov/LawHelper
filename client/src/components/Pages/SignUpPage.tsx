import React from 'react';
import SignUpForm from '../UI/SignUpForm';
import { useAppSelector } from '../../features/hooks';
import type { UserType } from '../../types/user/userType';

export default function SignUpPage(): JSX.Element {
  const user = useAppSelector<UserType>((state) => state.user);
  return <SignUpForm />;
}
