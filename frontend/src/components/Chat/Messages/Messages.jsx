import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../../../app/slices/messagesSlice.js";
import SendMessageForm from "./SendMessageForm.jsx";

const Messages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const activeChannel = useSelector((state) => state.channels.activeChannel);
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
        dispatch(setMessages(resMessages.data));
      }
    }
    fetchData();
  }, []);
  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${activeChannel.name}`} </b>
        </p>
        <span className="text-muted">
          {`${
            messages.filter((message) => message.channelId === activeChannel.id)
              .length
          } сообщений`}
        </span>
      </div>

      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {messages
          .filter((message) => message.channelId === activeChannel.id)
          .map((message) => (
            <div key={message.id} className="text-break mb-2">
              {message.username}: {message.body}
            </div>
          ))}
      </div>
      <SendMessageForm />
    </div>
  );
};

export default Messages;
