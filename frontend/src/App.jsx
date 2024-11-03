import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header.jsx';
import AuthRedirect from './components/Chat/AuthRedirect.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import routes from './routes.js';

const App = () => (
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

export default App;
