import React from 'react';
import {
  Card, Col, Container, Row,
} from 'react-bootstrap';
import { Footer } from '../ui/Footer';

export const HomeScreen = () => (
  <Container className="mt-5 text-dark" fluid>
    <Row>
      <Col className="d-flex justify-content-center">
        <i className="fas fa-skull fa-10x" />
      </Col>
    </Row>
    <Row>
      <Col>
        <h1 className="text-center">Te maté</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <Card.Body className="text-justify">
            El clásico juego para jugar en vacaciones con tus amistades ya está aquí!
            <Container fluid className="mt-1">
              <Row>
                <Col xs="1" className="p-0">
                  <i className="far fa-sticky-note" />
                </Col>
                <Col>
                  <p>Olvídate de los papelitos y del moderador.</p>
                </Col>
              </Row>
              <Row>
                <Col xs="1" className="p-0">
                  <i className="fas fa-user-secret" />
                </Col>
                <Col>
                  <p>La privacidad está asegurada: solo tú sabrás quién te tocó.</p>
                </Col>
              </Row>
              <Row>
                <Col xs="1" className="p-0">
                  <i className="fas fa-recycle" />
                </Col>
                <Col>
                  <p>
                    Te aseguras de que no se formen ciclos pequeños en la repartición.
                  </p>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Footer />
  </Container>
);
