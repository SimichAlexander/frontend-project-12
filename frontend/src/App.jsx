import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import filter from 'leo-profanity';
import Layout from './components/Layout.jsx';
import Chat from './components/Chat/Chat.jsx';
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
    <Routes>
      <Route path={routes.frontend.homePagePath()} element={<Layout />}>
        <Route index element={<Chat />} />
        <Route path={routes.frontend.loginPagePath()} element={<Login />} />
        <Route path={routes.frontend.signupPagePath()} element={<Signup />} />
        <Route path={routes.frontend.notFoundPagePath()} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
