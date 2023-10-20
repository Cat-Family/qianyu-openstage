import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Shell } from './components/Shell/Shell';
import { Welcome } from './components/Welcome/Welcome';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: [{ path: '/', element: <Welcome /> }],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
