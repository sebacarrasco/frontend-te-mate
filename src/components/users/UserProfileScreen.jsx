import React, { useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { startGettingUser } from '../../actions/users';
import { Loading } from '../ui/Loading';
import { useAuth } from '../../hooks/useAuth';
import { UserChallenges } from '../challenges/UserChallenges';
import { UserCard } from './UserCard';

export const UserProfileScreen = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { loading, error } = useSelector((state) => state.ui.userLoading);
  const { user } = useSelector((state) => state.users);
  const { isLogged, userId: currentUserId } = useAuth();

  useEffect(() => {
    dispatch(startGettingUser(userId, userId === currentUserId));
  }, [dispatch, startGettingUser, userId, currentUserId]);

  if (loading) {
    return <Loading />;
  }
  if (error === 409) {
    return <Alert variant="danger">No tienes autorización para ver tus propios retos</Alert>;
  }
  if (error === 404) {
    return <Alert variant="danger">No se encontró al usuario que buscas</Alert>;
  }
  if (error === 401) {
    return <Alert variant="danger">No tienes autorización para ver a este usuario</Alert>;
  }
  if (error === 400) {
    return <Alert variant="danger">Los datos ingresados para encontrar al usuario son inválidos</Alert>;
  }
  if (error !== '') {
    return <Alert variant="danger">Ha ocurrido un error, vuelve a intentarlo recargando la página</Alert>;
  }

  return (
    <>
      <Container fluid>
        <UserCard user={user} />
      </Container>
      {
        isLogged && currentUserId !== user.id && !loading && error === '' && !!user.challenges
          ? <UserChallenges challenges={user.challenges} userId={user.id} /> : null
      }
    </>
  );
};
