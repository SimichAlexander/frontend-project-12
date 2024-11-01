import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import filter from 'leo-profanity';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header.jsx';
import AuthRedirect from './components/Chat/AuthRedirect.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import { addMessage } from './api/slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './api/slices/channelsSlice.js';
import routes from './routes.js';

const App = ({ socket }) => {
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const dispatch = useDispatch();
  socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    dispatch(removeChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    dispatch(renameChannel(payload));
  });

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path="/" element={<AuthRedirect />} />
          <Route path={routes.loginPath()} element={<Login />} />
          <Route path={routes.registerPath()} element={<Signup />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <ToastContainer closeOnClick draggable />
    </BrowserRouter>
  );
};

export default App;
