import { createRoot } from 'react-dom/client';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';
import { io } from 'socket.io-client';
import Init from './init.jsx';

const socket = io();

i18next.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
});

createRoot(document.getElementById('root')).render(<Init socket={socket} />);
