import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Chat from "./components/Chat.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Chat />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
