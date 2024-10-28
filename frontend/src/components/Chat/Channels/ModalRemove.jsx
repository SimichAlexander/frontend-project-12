import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setActiveChannel } from "../../../app/slices/channelsSlice";

const ModalRemove = ({ show, channelId, handleClose }) => {
  const dispatch = useDispatch();

  const removeChannel = async (e) => {
    e.preventDefault();
    await axios.delete(`/api/v1/channels/${channelId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    handleClose();
    dispatch(setActiveChannel({ id: "1", name: "general", removable: false }));
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClose} className="me-2">
            Отменить
          </Button>
          <Button variant="danger" onClick={removeChannel}>
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemove;
