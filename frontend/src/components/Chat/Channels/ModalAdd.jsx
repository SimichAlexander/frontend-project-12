import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Modal } from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { setActiveChannel } from '../../../api/slices/channelsSlice';
import { useAddChannelMutation } from '../../../api/services/channelsApi';

const ModalAdd = ({ show, handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels).map((channel) => channel.name);
  const [addChannel] = useAddChannelMutation();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('required_field'))
      .min(3, t('character_limit'))
      .max(20, t('character_limit')),
  });

  const postChannel = async ({ name }, { setErrors }) => {
    const filteredName = filter.clean(name);

    if (channels.includes(filteredName)) {
      if (name !== filteredName) {
        return;
      }
      setErrors({
        name: t('must_be_unique'),
      });
    } else {
      const res = await addChannel(filteredName);
      dispatch(setActiveChannel(res.data));
      handleClose();
      toast.success(t('channel_created'));
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('add_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: '',
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

export default ModalAdd;
