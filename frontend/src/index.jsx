import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import Init from './Init.jsx';

const socket = io();

createRoot(document.getElementById('root')).render(<Init socket={socket} />);
