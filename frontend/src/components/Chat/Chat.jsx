import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Messages from "./components/Messages/Messages.jsx";
import Form from "./components/Form/Form.jsx";
import "./Chat.css";

const Chat = ({ socket }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("token from CHAT", token);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return token ? (
    <div className="container">
      <Sidebar />
      <div className="chat">
        <h2>Чат</h2>
        <Messages socket={socket} />
        <Form />
      </div>
    </div>
  ) : null;
};

export default Chat;
