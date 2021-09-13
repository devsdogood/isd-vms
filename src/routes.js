import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import UserList from './pages/UserList';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import EventList from './pages/EventList';
import EventView from './pages/EventView';
import NewEvent from './pages/NewEvent';
import Register from './pages/Register';
import Settings from './pages/Settings';

const routes = (isLoggedIn, userData) => [
  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout userData={userData} /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'users', element: <UserList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'events', element: <EventList /> },
      { path: 'events/:event', element: <EventView /> },
      { path: 'events/new', element: <NewEvent /> },
      { path: 'reports', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
