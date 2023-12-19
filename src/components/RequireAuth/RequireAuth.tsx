import React, { FC, useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';
import useFetch from '../../hooks/useFetch';

interface IRequireAuth {
  allowedRoles: Array<string>;
}
const RequireAuth: FC<IRequireAuth> = ({ allowedRoles }) => {
  const location = useLocation();
  const [value] = useCookie('qy');
  const { fetchData, data: res } = useFetch<{ code: number; message: string; data: string[] }>();

  useEffect(() => {
    value && fetchData('/router/loadRouters', { method: 'POST' });
  }, [value]);

  return value ? (
    res?.data &&
      (res.data.find((role: any) => allowedRoles?.includes(role)) ? (
        <Outlet />
      ) : (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      ))
  ) : (
    <Navigate to="/users/auth" state={{ from: location }} replace />
  );
};

export default RequireAuth;
