import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChannels } from "../../../app/slices/chat/channelsSlice.js";
import Channel from "./Channel/Channel.jsx";
import ModalAdd from "./ModalAdd/ModalAdd.jsx";
import "./Channels.css";

const Channels = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const token = localStorage.getItem("token");

  const fetchChannels = async () => {
    const resChannels = await axios.get("/api/v1/channels", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("dataChannels= ", resChannels.data); // =>[{ id: '1', name: 'general', removable: false }, ...]
    dispatch(setChannels(resChannels.data));
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  return (
    <div className="channels">
      <h2>Каналы</h2>
      <button onClick={() => setModalAdd(!modalAdd)}>+</button>
      {modalAdd && <ModalAdd />}
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>
            <Channel channel={channel} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
