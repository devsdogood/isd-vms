import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import UserList from './pages/UserList';
import UserView from './pages/UserView';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import EventList from './pages/EventList';
import AdminEventView from './pages/AdminEventView';
import NewEvent from './pages/NewEvent';
import Register from './pages/Register';
import Settings from './pages/Settings';
import VolunteerEventView from './pages/VolunteerEventView';
import ForgotPassword from './pages/ForgotPassword';

const routes = (isLoggedIn, userData) => [
  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout userData={userData} /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'users', element: <UserList /> },
      { path: 'users/:user', element: <UserView /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'events', element: <EventList /> },
      { path: 'events/:event', element: userData?.isAdmin ? <AdminEventView /> : <VolunteerEventView /> },
      { path: 'events/new', element: <NewEvent /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgotpassword', element: <ForgotPassword /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
