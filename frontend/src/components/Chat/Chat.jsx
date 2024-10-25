import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Channels from "./Channels/Channels.jsx";
import Messages from "./Messages/Messages.jsx";
import Form from "./Form/Form.jsx";
import "./Chat.css";

const Chat = ({ socket }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return (
    token && (
      <div className="container">
        <Channels />
        <div className="chat">
          <h2>Чат</h2>
          <Messages socket={socket} />
          <Form />
        </div>
      </div>
    )
  );
};

export default Chat;
