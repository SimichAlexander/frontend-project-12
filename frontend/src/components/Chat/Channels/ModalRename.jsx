import axios from "axios";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ModalRename = ({ show, channel, handleClose }) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.channels).map(
    (channel) => channel.name
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("required_field"))
      .min(3, t("character_limit"))
      .max(20, t("character_limit")),
  });

  const renameChannel = async ({ name }, { setErrors }) => {
    if (channels.includes(name)) {
      setErrors({
        name: t("must_be_unique"),
      });
    } else {
      await axios.patch(
        `/api/v1/channels/${channel.id}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("rename_channel")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={{
            name: channel.name || "",
          }}
          validationSchema={validationSchema}
          onSubmit={renameChannel}
        >
          {({ errors, touched }) => (
            <Form className="">
              <div>
                <Field
                  name="name"
                  id="name"
                  className={`form-control mb-2 ${
                    errors.name && touched.name ? "is-invalid" : ""
                  }`}
                />
                <label className="visually-hidden" htmlFor="name">
                  {t("channel_name")}
                </label>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="invalid-feedback"
                />
                <div className="d-flex justify-content-end">
                  <button
                    onClick={handleClose}
                    type="button"
                    className="me-2 btn btn-secondary"
                  >
                    {t("cancel")}
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {t("send")}
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

export default ModalRename;
