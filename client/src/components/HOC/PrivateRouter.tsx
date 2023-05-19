import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type PrivateRouteProps = {
  isAllowed: boolean;
  redirectPath?: string;
  children?: React.ReactElement;
};

export default function PrivateRoute({
  isAllowed,
  redirectPath = '/',
  children,
}: PrivateRouteProps): JSX.Element {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;
}
