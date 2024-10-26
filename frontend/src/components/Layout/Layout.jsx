import { Link, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Navbar, Container, Button } from "react-bootstrap";

const Layout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm" expand="lg" bg="white">
          <Container>
            <Link className="navbar-brand" to="/">
              {t("hexletChat")}
            </Link>
            {token && (
              <Button onClick={handleLogout} variant="primary">
                {t("logout")}
              </Button>
            )}
          </Container>
        </Navbar>
        <Outlet />
      </div>
      {/* Tostify */}
    </div>
  );
};

export default Layout;
