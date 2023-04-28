import { FC, useState } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

interface IRequireAuth {
  allowedRoles: Array<number>
}
const RequireAuth: FC<IRequireAuth> = ({ allowedRoles }) => {
  const location = useLocation()

  return [19999] ? (
    [19999].find((role: any) => allowedRoles?.includes(role)) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/users/login" state={{ from: location }} replace />
  )
}

export default RequireAuth
