import React from 'react';
import {
  Col, Container, Nav, Navbar as NavBar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { PrivateNavLinks } from './PrivateNavLinks';
import { PublicNavLinks } from './PublicNavLinks';

export const Navbar = () => {
  const { isLogged } = useAuth();

  return (
    <NavBar bg="dark" variant="dark" sticky="top">
      <Container>
        <Col>
          <NavBar.Brand as={Link} to="/">
            <i className="fas fa-skull" />
            {' '}
            Te maté
          </NavBar.Brand>
        </Col>
        <Col>
          <Nav className="d-flex justify-content-end">
            <Nav.Link as={Link} to="/"><i className="fas fa-home fa-lg" /></Nav.Link>
            {
              isLogged ? <PrivateNavLinks /> : <PublicNavLinks />
            }
          </Nav>
        </Col>
      </Container>
    </NavBar>
  );
};
