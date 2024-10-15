import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import Pad from './pages/Pad';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/pad',
    element: <Pad />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
