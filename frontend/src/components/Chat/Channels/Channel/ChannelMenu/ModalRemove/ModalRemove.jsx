import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { setActiveChannel } from "../../../../../../app/slices/chat/channelsSlice";

const ModalRemove = ({ channelId, modal: { modalRemove, setModalRemove } }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const handleClose = (e) => {
    e.preventDefault();
    setModalRemove(!modalRemove);
  };

  const removeChannel = async (e) => {
    e.preventDefault();
    await axios.delete(`/api/v1/channels/${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setModalRemove(!modalRemove);
    dispatch(setActiveChannel("1"));
  };
  return (
    <Modal show>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Уверены?
        <button onClick={handleClose} type="button">
          Отменить
        </button>
        <button onClick={removeChannel} type="submit">
          Удалить
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemove;
