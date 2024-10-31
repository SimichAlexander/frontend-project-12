import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setActiveChannel } from '../../../api/slices/channelsSlice';
import { useRemoveChannelMutation } from '../../../api/services/channelsApi';

const ModalRemove = ({ show, channelId, handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [removeChannel] = useRemoveChannelMutation();

  const deleteChannel = async (e) => {
    e.preventDefault();
    await removeChannel(channelId);

    handleClose();
    dispatch(setActiveChannel({ id: '1', name: 'general', removable: false }));
    toast.success(t('channel_deleted'));
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('delete_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('are_you_sure')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClose} className="me-2">
            {t('cancel')}
          </Button>
          <Button variant="danger" onClick={deleteChannel}>
            {t('delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemove;
