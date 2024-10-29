import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from './app/store.js';
import './init.js';
import App from './App.jsx';

const rollbarConfig = {
  accessToken: '309a72e2808248cab0b92cd26d768926',
  environment: 'testenv',
};

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ReduxProvider store={store}>
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
          <ToastContainer closeOnClick draggable />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </ReduxProvider>
  // </StrictMode>
);
