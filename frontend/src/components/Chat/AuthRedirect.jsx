import { Navigate } from 'react-router-dom';
import Chat from './Chat';
import routes from '../../routes';

const AuthRedirect = () => {
  const token = localStorage.getItem('token');
  return token ? <Chat /> : <Navigate to={routes.loginPath()} />;
};

export default AuthRedirect;
