import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Shell } from './components/Shell/Shell';
import { Welcome } from './components/Welcome/Welcome';
import { Authentication } from './pages/Authentication/Authentication.page';
import Oauth from './pages/Oauth/Oauth.page';
import TablePage from './pages/Table/Table.page';

const router = createBrowserRouter([
  {
    path: '/users/login',
    element: <Authentication />,
  },
  {
    path: '/users/oauth',
    element: <Oauth />,
  },
  {
    path: '/',
    element: <Shell />,
    children: [{ path: '/', element: <TablePage /> }],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
