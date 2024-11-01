import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Layout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <Navbar className="shadow-sm" expand="lg" bg="white">
        <Container>
          <Link className="navbar-brand" to="/">
            {t('app_title')}
          </Link>
          {token && (
            <Button onClick={handleLogout} variant="primary">
              {t('logout')}
            </Button>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;
