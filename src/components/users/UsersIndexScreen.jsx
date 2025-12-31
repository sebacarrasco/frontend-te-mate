import React, { useEffect } from 'react';
import {
  Container, Row, Col, Alert,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { startGettingUsers } from '../../actions/users';
import { Loading } from '../ui/Loading';
import { UserListIndex } from './UserListIndex';

export const UsersIndexScreen = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.ui.usersLoading);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(startGettingUsers());
  }, [dispatch, startGettingUsers]);
  if (loading) {
    return <Loading />;
  }
  if (error === 401) {
    return <Alert variant="danger">No tienes autorización para ver a los usuarios</Alert>;
  }
  if (error !== '') {
    return <Alert variant="danger">Ha ocurrido un error, vuelve a intentarlo recargando la página</Alert>;
  }

  return (
    <Container fluid>
      <p>Haz click sobre un usuario para ir a su perfil</p>
      <Row>
        <Col>
          <UserListIndex users={users} />
        </Col>
      </Row>
    </Container>
  );
};
