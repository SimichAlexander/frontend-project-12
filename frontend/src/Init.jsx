import { Provider as ReduxProvider } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';

import store from './api/store.js';
import App from './App.jsx';

const Init = ({ socket }) => {
  const isProd = process.env.NODE_ENV === 'production';
  const rollbarConfig = {
    enabled: isProd,
    accessToken: import.meta.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  return (
    <ReduxProvider store={store}>
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          <App socket={socket} />
        </ErrorBoundary>
      </Provider>
    </ReduxProvider>
  );
};

export default Init;
