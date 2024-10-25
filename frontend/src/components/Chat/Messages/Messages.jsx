import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setMessages,
  addMessage,
} from "../../../app/slices/chat/messagesSlice.js";
import "./Messages.css";

const Messages = ({ socket }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const activeChannel = useSelector((state) => state.channels.activeChannel);

  // socket.on("newMessage", (payload) => {
  //   console.log("Hello from socket");
  //   console.log("newMessage", payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
  //   // dispatch(addMessage(payload));
  //   // console.log("messages!!!! = ", messages);
  // });

  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("token")) {
        navigate("/login");
      } else {
        const token = localStorage.getItem("token");
        const resMessages = await axios.get("/api/v1/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("dataMessages= ", resMessages.data); // =>[{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
        dispatch(setMessages(resMessages.data));
      }
    }
    fetchData();
  }, []);

  return (
    <div className="messages">
      {messages
        .filter((message) => message.channelId === activeChannel)
        .map((message) => (
          <div key={message.id} className="message">
            {message.body}
          </div>
        ))}
    </div>
  );
};

export default Messages;
