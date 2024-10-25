import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <h1>Hexlet Chat</h1>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
