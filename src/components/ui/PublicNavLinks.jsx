import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const PublicNavLinks = () => (
  <Nav.Link as={Link} to="/auth/login"><i className="fas fa-sign-in-alt fa-lg" /></Nav.Link>
);
