import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getLocalStorage, clearLocalStorage } from '../api/services/authApi.js';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearLocalStorage();
    navigate('/login');
  };

  return (
    <Navbar className="shadow-sm" expand="lg" bg="white">
      <Container>
        <Link className="navbar-brand" to="/">
          {t('app_title')}
        </Link>
        {getLocalStorage().token && (
          <Button onClick={handleLogout} variant="primary">
            {t('logout')}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
