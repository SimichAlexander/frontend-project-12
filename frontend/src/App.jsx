import { Routes, Route } from "react-router-dom";
import socketIO from "socket.io-client";
import Layout from "./components/Layout/Layout.jsx";
import Chat from "./components/Chat/Chat.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage.jsx";

const socket = socketIO.connect("http://localhost:5001");

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Chat socket={socket} />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
