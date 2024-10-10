import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();

  const goLogin = () => navigate("/login");
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      goLogin();
    }
  }, []);

  return <>Chats</>;
};

export default Chat;
