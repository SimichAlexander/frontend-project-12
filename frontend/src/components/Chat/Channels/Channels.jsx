import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Nav } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import Channel from './Channel.jsx';
import ModalAdd from './ModalAdd.jsx';
import { setChannels } from '../../../api/slices/channelsSlice.js';
import { useGetChannelsQuery } from '../../../api/services/channelsApi.js';

const Channels = () => {
  const { t } = useTranslation();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const { data } = useGetChannelsQuery();

  useEffect(() => {
    if (data) {
      dispatch(setChannels(data));
    }
  }, [data, dispatch]);

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <Button
          onClick={() => setShowModalAdd(!showModalAdd)}
          variant=""
          className="p-0 text-primary btn-group-vertical"
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">{t('plus')}</span>
        </Button>
        {showModalAdd && (
          <ModalAdd show={showModalAdd} handleClose={() => setShowModalAdd(false)} />
        )}
      </div>

      <Nav
        id="channels-box"
        className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <Nav.Item key={channel.id} className="w-100">
            <Channel channel={channel} />
          </Nav.Item>
        ))}
      </Nav>
    </>
  );
};

export default Channels;
