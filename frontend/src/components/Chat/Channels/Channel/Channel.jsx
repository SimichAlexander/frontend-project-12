import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChannel } from "../../../../app/slices/chat/channelsSlice.js";
import ChannelMenu from "./ChannelMenu/ChannelMenu.jsx";

import { Button, Nav, Dropdown } from "react-bootstrap";

const Channel = ({ channel }) => {
  const [channelMenu, setChannelMenu] = useState(false);
  const activeChannel = useSelector((state) => state.channels.activeChannel);

  const dispatch = useDispatch();

  return (
    <Nav.Item className="w-100">
      {!channel.removable && (
        <Button
          onClick={() =>
            dispatch(setActiveChannel({ id: channel.id, name: channel.name }))
          }
          variant="secondary"
          className="w-100 rounded-0 text-start"
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )}
      {channel.removable && (
        <div role="group" className="d-flex show dropdown btn-group">
          <Button
            onClick={() =>
              dispatch(setActiveChannel({ id: channel.id, name: channel.name }))
            }
            variant=""
            className="w-100 rounded-0 text-start text-truncate"
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown>
            <Dropdown.Toggle split variant="" className="flex-grow-0">
              <span className="visually-hidden">Управление каналом</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => console.log("GOOD remove!!!")}
                href="#"
              >
                Удалить
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => console.log("GOOD rename!!!")}
                href="#"
              >
                Переименовать
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </Nav.Item>
  );

  // <button onClick={() => setChannelMenu(!channelMenu)}>v</button>

  // return (
  //   <>
  //     {channelMenu && (
  //       <ChannelMenu
  //         channelId={channel.id}
  //         menu={{ channelMenu, setChannelMenu }}
  //       />
  //     )}
  //   </>
  // );
};

export default Channel;
