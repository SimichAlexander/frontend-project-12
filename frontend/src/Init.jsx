import { Provider as ReduxProvider } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';

import App from './App.jsx';
import store from './api/store.js';
import resources from './locales/index.js';

import { messagesApi } from './api/services/messagesApi.js';
import { channelsApi } from './api/services/channelsApi.js';

const Init = ({ socket }) => {
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  i18next.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
  });

  const isProd = process.env.NODE_ENV === 'production';
  const rollbarConfig = {
    enabled: isProd,
    accessToken: import.meta.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  socket.on('newMessage', (payload) => {
    store.dispatch(
      messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
        draftMessages.push(payload);
      }),
    );
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
        draftChannels.push(payload);
      }),
    );
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
        const index = draftChannels.findIndex((channel) => channel.id === payload.id);
        draftChannels.splice(index, 1);
      }),
    );
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => draftChannels.map((channel) => {
        if (channel.id === payload.id) {
          return { ...channel, name: payload.name };
        }
        return channel;
      })),
    );
  });

  return (
    <ReduxProvider store={store}>
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </ReduxProvider>
  );
};

export default Init;
