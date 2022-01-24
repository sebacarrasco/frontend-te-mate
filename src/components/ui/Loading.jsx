import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

export const Loading = () => (
  <Container className="text-center">
    <Spinner animation="border" variant="primary" />
  </Container>
);
