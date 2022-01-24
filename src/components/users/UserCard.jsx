import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import {
  Container, ListGroup, Row, Col, Card, Button,
} from 'react-bootstrap';
import { logout } from '../../actions/auth';
import { useAuth } from '../../hooks/useAuth';

export const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { isLogged, userId: currentUserId } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: 'Confirmas que quieres cerrar la sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Hasta pronto!', '', 'success');
        dispatch(logout());
      }
    });
  };

  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between">
        {`${user.firstName} ${user.lastName}`}
        {
          isLogged && currentUserId === user.id
            ? (
              <Button type="button" variant="danger" size="sm" onClick={() => handleLogout()}>
                <i className="fas fa-sign-out-alt" />
                {' '}
                Cerrar sesión
              </Button>
            ) : null
        }
      </Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col className="d-flex align-items-center justify-content-center" xs={3}>
              <Row>
                <i className="fas fa-user fa-5x" />
              </Row>
            </Col>
            <Col>
              <ListGroup variant="flush">
                <ListGroup.Item variant="light" className="mt-2 rounded">
                  {` ${user.email}`}
                </ListGroup.Item>
                <ListGroup.Item variant="light" className="mt-2 rounded">
                  Se unió el
                  {' '}
                  {moment(user.createdAt).format('DD/MM/YYYY')}
                </ListGroup.Item>
                <ListGroup.Item variant="light" className="mt-2 rounded">
                  Muertes provocadas:
                  {` ${user.kills}`}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    kills: PropTypes.number.isRequired,
  }).isRequired,
};
