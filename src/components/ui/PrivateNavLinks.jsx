import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const PrivateNavLinks = () => {
  const { userId } = useAuth();

  return (
    <>
      <Nav.Link as={Link} to="/games"><i className="fas fa-gamepad fa-lg" /></Nav.Link>
      <Nav.Link as={Link} to="/users"><i className="fas fa-users fa-lg" /></Nav.Link>
      <Nav.Link as={Link} to={`/users/${userId}`}><i className="fas fa-user fa-lg" /></Nav.Link>
    </>
  );
};
