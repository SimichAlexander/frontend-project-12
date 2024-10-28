import axios from "axios";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { setActiveChannel } from "../../../app/slices/channelsSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Обязательное поле")
    .min(3, "От 3 до 20 символов")
    .max(20, "От 3 до 20 символов"),
});

const ModalAdd = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels).map(
    (channel) => channel.name
  );

  const postChannel = async ({ name }, { setErrors }) => {
    if (channels.includes(name)) {
      setErrors({
        name: "Должно быть уникальным",
      });
    } else {
      const res = await axios.post(
        "/api/v1/channels",
        { name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(setActiveChannel(res.data));
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={validationSchema}
          onSubmit={postChannel}
        >
          {({ errors, touched }) => (
            <Form className="">
              <div>
                <Field
                  name="name"
                  id="name"
                  // className="form-control mb-2"
                  className={`form-control mb-2 ${
                    errors.name && touched.name ? "is-invalid" : ""
                  }`}
                />
                <label className="visually-hidden" htmlFor="name">
                  Имя канала
                </label>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="invalid-feedback"
                />
                <div className="d-flex justify-content-end">
                  <button type="button" className="me-2 btn btn-secondary">
                    Отменить
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Отправить
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAdd;
