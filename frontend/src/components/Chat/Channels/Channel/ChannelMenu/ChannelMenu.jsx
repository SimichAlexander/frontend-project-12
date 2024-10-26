import { useState } from "react";
import ModalRemove from "./ModalRemove/ModalRemove";
import ModalRename from "./ModalRename/ModalRename";

const ChannelMenu = ({ channelId, menu: { channelMenu, setChannelMenu } }) => {
  const [modalRemove, setModalRemove] = useState(false);
  const [modalRename, setModalRename] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setModalRemove(!modalRemove);
          // setChannelMenu(!channelMenu); // баг
        }}
      >
        Удалить
      </button>
      <button
        onClick={() => {
          setModalRename(!modalRename);
          // setChannelMenu(!channelMenu); // баг
        }}
      >
        Переименовать
      </button>
      {modalRemove && (
        <ModalRemove
          channelId={channelId}
          modal={{ modalRemove, setModalRemove }}
        />
      )}
      {modalRename && (
        <ModalRename
          channelId={channelId}
          modal={{ modalRename, setModalRename }}
        />
      )}
    </div>
  );
};

export default ChannelMenu;
