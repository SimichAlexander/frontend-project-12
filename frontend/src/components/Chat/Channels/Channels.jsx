import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChannels } from "../../../app/slices/chat/channelsSlice.js";
import Channel from "./Channel/Channel.jsx";
import ModalAdd from "./ModalAdd/ModalAdd.jsx";

import { useTranslation } from "react-i18next";

import { Button, ListGroup, Nav, Dropdown } from "react-bootstrap";

const Channels = () => {
  const { t } = useTranslation();
  const [modalAdd, setModalAdd] = useState(false);
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const token = localStorage.getItem("token");

  const getChannels = async () => {
    const resChannels = await axios.get("/api/v1/channels", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("dataChannels= ", resChannels.data); // =>[{ id: '1', name: 'general', removable: false }, ...]
    dispatch(setChannels(resChannels.data));
  };

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t("channels")}</b>
        <Button
          onClick={() => setModalAdd(!modalAdd)}
          variant=""
          className="p-0 text-primary btn-group-vertical"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
        {modalAdd && <ModalAdd modal={{ modalAdd, setModalAdd }} />}
      </div>

      <Nav
        id="channels-box"
        className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <Channel key={channel.id} channel={channel} />
        ))}
      </Nav>

      {/* <ListGroup
        id="channels-box"
        className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <ListGroup.Item
            key={channel.id}
            className="w-100 rounded-0 text-start"
          >
            <Channel channel={channel} />
          </ListGroup.Item>
        ))}
      </ListGroup> */}
    </>
  );
};

export default Channels;
