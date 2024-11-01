import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from './Chat';

const AuthRedirect = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return <Chat />;
};

export default AuthRedirect;
