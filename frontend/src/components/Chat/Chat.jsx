import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Channels from './Channels/Channels.jsx';
import Messages from './Messages/Messages.jsx';

import { Container, Row, Col } from 'react-bootstrap';

const Chat = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  return (
    token && (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
            <Channels />
          </Col>
          <Col className="p-0 h-100">
            <Messages />
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Chat;
