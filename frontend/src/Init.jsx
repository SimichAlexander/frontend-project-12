import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './api/store.js';
import App from './App.jsx';

const Init = ({ socket }) => {
  console.log('process.env.NODE_ENV =', process.env.NODE_ENV);
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
          <BrowserRouter>
            <App socket={socket} />
            <ToastContainer closeOnClick draggable />
          </BrowserRouter>
        </ErrorBoundary>
      </Provider>
    </ReduxProvider>
  );
};

export default Init;
