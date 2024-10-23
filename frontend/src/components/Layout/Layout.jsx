import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>Hexlet Chat</header>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
