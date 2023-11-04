import React, { FC } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';

interface IRequireAuth {
  allowedRoles: Array<number>;
}
const RequireAuth: FC<IRequireAuth> = ({ allowedRoles }) => {
  const location = useLocation();
  const [value] = useCookie('qy');

  return !value ? (
    [29999].find((role: any) => allowedRoles?.includes(role)) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/users/auth" state={{ from: location }} replace />
  );
};

export default RequireAuth;
