import { Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";

import Layout from "./components/Layout.jsx";
import Chat from "./components/Chat/Chat.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";

import { useDispatch } from "react-redux";
import { addMessage } from "./app/slices/messagesSlice.js";
import {
  addChannel,
  removeChannel,
  renameChannel,
} from "./app/slices/channelsSlice.js";

const App = () => {
  const socket = io();
  const dispatch = useDispatch();
  socket.on("newMessage", (payload) => {
    dispatch(addMessage(payload));
  });

  socket.on("newChannel", (payload) => {
    dispatch(addChannel(payload)); // { id: 6, name: "new channel", removable: true }
  });

  socket.on("removeChannel", (payload) => {
    dispatch(removeChannel(payload)); // { id: 6 };
  });

  socket.on("renameChannel", (payload) => {
    dispatch(renameChannel(payload)); // { id: 7, name: "new name channel", removable: true }
  });

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
