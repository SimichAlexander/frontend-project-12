import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown } from 'react-bootstrap';
import ModalRemove from './ModalRemove.jsx';
import ModalRename from './ModalRename.jsx';
import { setActiveChannel } from '../../../app/slices/channelsSlice.js';

const Channel = ({ channel }) => {
  const { t } = useTranslation();
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [showModalRename, setShowModalRename] = useState(false);

  const activeChannel = useSelector((state) => state.channels.activeChannel);

  const dispatch = useDispatch();

  return (
    <>
      {!channel.removable && (
        <Button
          onClick={() => dispatch(setActiveChannel({ id: channel.id, name: channel.name }))}
          variant={channel.id === activeChannel.id ? 'secondary' : ''}
          className="w-100 rounded-0 text-start"
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )}

      {channel.removable && (
        <Dropdown role="group" as={Button.Group} className="d-flex btn-group">
          <Button
            onClick={() => dispatch(setActiveChannel(channel))}
            variant={channel.id === activeChannel.id ? 'secondary' : ''}
            className="w-100 rounded-0 text-start text-truncate"
          >
            <span className="me-1">{t('title_hash')}</span>
            {channel.name}
          </Button>

          <Dropdown.Toggle
            split
            variant={channel.id === activeChannel.id ? 'secondary' : ''}
            id="dropdown-custom-components"
            className="flex-grow-0"
          >
            <span className="visually-hidden">{t('channel_management')}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setShowModalRemove(true)} href="#">
              {t('delete')}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setShowModalRename(true)} href="#">
              {t('rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}

      <ModalRemove
        show={showModalRemove}
        channelId={channel.id}
        handleClose={() => setShowModalRemove(false)}
      />
      <ModalRename
        show={showModalRename}
        channel={channel}
        handleClose={() => setShowModalRename(false)}
      />
    </>
  );
};

export default Channel;
