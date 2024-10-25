import { useState } from "react";

const ChannelMenu = () => {
  const [modalRemove, setModalRemove] = useState(false);
  const [modalRename, setModalRename] = useState(false);
  return (
    <div>
      <button onClick={() => setModalRemove(!modalRemove)}>Удалить</button>
      <button onClick={() => setModalRename(!modalRename)}>
        Переименовать
      </button>
      {modalRemove && console.log("Modal Remove")}
      {modalRename && console.log("modal Rename")}
    </div>
  );
};

export default ChannelMenu;
