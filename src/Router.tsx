import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Pad from './pages/Pad';

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <HomePage />,
  // },
  {
    path: '/',
    element: <Pad />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
