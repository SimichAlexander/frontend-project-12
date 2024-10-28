import axios from "axios";
import { Modal } from "react-bootstrap";
import { useState } from "react";

const ModalRename = ({ channelId, show, handleClose }) => {
  const [channelName, setChannelName] = useState("");
  const token = localStorage.getItem("token");
  const handleClose = (e) => {
    e.preventDefault();
    setModalRename(!modalRename);
  };

  const renameChannel = async (e) => {
    e.preventDefault();
    await axios.patch(
      `/api/v1/channels/${channelId}`,
      { name: channelName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setModalRename(!modalRename);
  };
  return (
    <Modal show>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <div>
            <input
              name="name"
              id="name"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />
            <label htmlFor="name">Имя канала</label>
            <div>
              <button onClick={handleClose} type="button">
                Отменить
              </button>
              <button onClick={renameChannel} type="submit">
                Отправить
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRename;
