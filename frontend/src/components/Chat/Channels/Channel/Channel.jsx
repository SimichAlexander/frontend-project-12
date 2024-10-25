import { useState } from "react";
import { useDispatch } from "react-redux";
import { setActiveChannel } from "../../../../app/slices/chat/channelsSlice.js";
import ChannelMenu from "./ChannelMenu/ChannelMenu.jsx";

const Channel = ({ channel }) => {
  const [channelMenu, setChannelMenu] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <button onClick={() => dispatch(setActiveChannel(channel.id))}>
        {channel.name}
      </button>
      {channel.removable && (
        <button onClick={() => setChannelMenu(!channelMenu)}>v</button>
      )}
      {channelMenu && <ChannelMenu />}
    </>
  );
};

export default Channel;
