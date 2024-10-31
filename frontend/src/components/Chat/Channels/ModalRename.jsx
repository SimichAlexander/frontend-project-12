import * as Yup from 'yup';
import { Modal } from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useRenameChannelMutation } from '../../../api/services/channelsApi';

const ModalRename = ({ show, channel, handleClose }) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.channels).map((item) => item.name);
  const [renameChannel] = useRenameChannelMutation();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('required_field'))
      .min(3, t('character_limit'))
      .max(20, t('character_limit')),
  });

  const patchChannel = async ({ name }, { setErrors }) => {
    const filteredName = filter.clean(name);
    if (channels.includes(filteredName)) {
      if (name !== filteredName) {
        return;
      }
      setErrors({
        name: t('must_be_unique'),
      });
    } else {
      await renameChannel({ id: channel.id, name: filteredName });
      handleClose();
      toast.success(t('channel_renamed'));
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('rename_channel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={{
            name: channel.name || '',
          }}
          validationSchema={validationSchema}
          onSubmit={patchChannel}
        >
          {({ errors, touched }) => (
            <Form className="">
              <div>
                <Field
                  name="name"
                  id="name"
                  className={`form-control mb-2 ${errors.name && touched.name ? 'is-invalid' : ''}`}
                />
                <label className="visually-hidden" htmlFor="name">
                  {t('channel_name')}
                </label>
                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                <div className="d-flex justify-content-end">
                  <button onClick={handleClose} type="button" className="me-2 btn btn-secondary">
                    {t('cancel')}
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {t('send')}
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
