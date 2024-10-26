import axios from "axios";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { setActiveChannel } from "../../../../app/slices/chat/channelsSlice";

const ModalAdd = ({ modal: { modalAdd, setModalAdd } }) => {
  const [channelName, setChannelName] = useState("");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const handleClose = (e) => {
    e.preventDefault();
    setModalAdd(!modalAdd);
    setChannelName("");
  };

  const postChannel = async (e) => {
    e.preventDefault();
    if (channelName) {
      const res = await axios.post(
        "/api/v1/channels",
        { name: channelName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setModalAdd(!modalAdd);
      setChannelName("");
      dispatch(setActiveChannel(res.data.id));
    }
  };
  return (
    <Modal show>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Добавить канал</Modal.Title>
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
              <button onClick={postChannel} type="submit">
                Отправить
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAdd;
