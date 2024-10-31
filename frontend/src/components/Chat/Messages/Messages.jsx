import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SendMessageForm from './SendMessageForm.jsx';
import { setMessages } from '../../../api/slices/messagesSlice.js';
import { useGetMessagesQuery } from '../../../api/services/messagesApi.js';

const Messages = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const messages = useSelector((state) => state.messages.messages);
  const messagesCount = messages.filter((message) => message.channelId === activeChannel.id).length;
  const { data } = useGetMessagesQuery();

  useEffect(() => {
    if (data) {
      dispatch(setMessages(data));
    }
  }, [data, dispatch]);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {'# '}
            {activeChannel.name}
          </b>
        </p>
        <span className="text-muted">
          {`${t('messages.count', {
            count: messagesCount,
          })}`}
        </span>
      </div>

      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {messages
          .filter((message) => message.channelId === activeChannel.id)
          .map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>
              {': '}
              {message.body}
            </div>
          ))}
      </div>
      <SendMessageForm />
    </div>
  );
};

export default Messages;
