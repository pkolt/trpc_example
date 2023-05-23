import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PageUrl } from './constants.js';
import { PrivatePage } from './components/PrivatePage/index.js';

const Login = lazy(() => import('./pages/Login/index.js'));
const Logout = lazy(() => import('./pages/Logout/index.js'));
const Dashboard = lazy(() => import('./pages/Dashboard/index.js'));
const Registration = lazy(() => import('./pages/Registration/index.js'));
const Profile = lazy(() => import('./pages/Profile/index.js'));

export const router = createBrowserRouter([
  {
    path: PageUrl.Root,
    element: (
      <PrivatePage>
        <Navigate to={PageUrl.Dashboard} />
      </PrivatePage>
    ),
  },
  {
    path: PageUrl.Login,
    element: <Login />,
  },
  {
    path: PageUrl.Logout,
    element: (
      <PrivatePage>
        <Logout />
      </PrivatePage>
    ),
  },
  {
    path: PageUrl.Dashboard,
    element: (
      <PrivatePage>
        <Dashboard />
      </PrivatePage>
    ),
  },
  {
    path: PageUrl.Registration,
    element: <Registration />,
  },
  {
    path: PageUrl.Profile,
    element: (
      <PrivatePage>
        <Profile />
      </PrivatePage>
    ),
  },
]);
