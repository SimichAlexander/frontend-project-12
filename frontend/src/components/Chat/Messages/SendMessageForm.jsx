import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useAddMessageMutation } from '../../../api/services/messagesApi';

const SendMessageForm = () => {
  const { t } = useTranslation();
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const [addMessage] = useAddMessageMutation();

  const handleSendMessage = async ({ body }, { setFieldValue }) => {
    const filteredBody = filter.clean(body);
    await addMessage({
      body: filteredBody,
      channelId: activeChannel.id,
      username: localStorage.getItem('username'),
    });
    setFieldValue('body', '');
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{
          body: '',
        }}
        onSubmit={handleSendMessage}
      >
        {({ values }) => (
          <Form noValidate className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <Field
                name="body"
                className="border-0 p-0 ps-2 form-control"
                aria-label={t('new_message')}
                placeholder={t('enter_message')}
              />
              <button type="submit" disabled={!values.body} className="btn btn-group-vertical">
                <ArrowRightSquare size={20} />
                <span className="visually-hidden">{t('send')}</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SendMessageForm;
