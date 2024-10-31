import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './api/store.js';
import App from './App.jsx';

const Init = ({ socket }) => {
  const rollbarConfig = {
    accessToken: '309a72e2808248cab0b92cd26d768926',
    environment: 'testenv',
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
