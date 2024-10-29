import axios from 'axios';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

const SendMessageForm = () => {
  const { t } = useTranslation();
  const activeChannel = useSelector((state) => state.channels.activeChannel);

  const handleSendMessage = async ({ body }, { setFieldValue }) => {
    const filteredBody = filter.clean(body);
    await axios.post(
      '/api/v1/messages',
      {
        body: filteredBody,
        channelId: activeChannel.id,
        username: localStorage.getItem('username'),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                  ></path>
                </svg>
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
