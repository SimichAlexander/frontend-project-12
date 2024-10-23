import React, { useState } from "react";
import axios from "axios";
import "./Form.css";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../../../../app/slices/chat/messagesSlice";

const Form = () => {
  const dispatch = useDispatch();
  const [currentMessage, setCurrentMessage] = useState("");
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const activeUsername = useSelector((state) => state.auth.username);
  const token = useSelector((state) => state.auth.token);
  console.log(activeUsername, token);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage) {
      const response = await axios.post(
        "/api/v1/messages",
        {
          body: currentMessage,
          channelId: activeChannel,
          username: activeUsername,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // => { id: '1', body: 'new message', channelId: '1', username: 'admin }
      setCurrentMessage("");
      // dispatch(addMessage(response.data));
    }
  };
  return (
    <form onSubmit={sendMessage}>
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        placeholder="Введите ваше сообщение"
      />
      <button type="submit">Отправить</button>
    </form>
  );
};

export default Form;
