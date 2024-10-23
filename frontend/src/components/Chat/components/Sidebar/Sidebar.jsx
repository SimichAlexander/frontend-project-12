import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setChannels,
  setActiveChannel,
} from "../../../../app/slices/chat/channelsSlice.js";

import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const token = localStorage.getItem("token");
  console.log("token from SideBar1", token);

  useEffect(() => {
    async function fetchData() {
      if (!token) {
        navigate("/login");
      } else {
        const resChannels = await axios.get("/api/v1/channels", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("dataChannels= ", resChannels.data); // =>[{ id: '1', name: 'general', removable: false }, ...]
        dispatch(setChannels(resChannels.data));
      }
    }
    fetchData();
  }, []);

  console.log("token from SideBar2", token);

  return (
    <div className="sidebar">
      <h2>Каналы</h2>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>
            <button onClick={() => dispatch(setActiveChannel(channel.id))}>
              {channel.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
