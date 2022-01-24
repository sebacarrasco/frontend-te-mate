import React from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export const AccountConfirmationScreen = () => {
  const navigate = useNavigate();
  const { status } = useParams();
  let message;
  let variant;
  switch (status) {
    case 'confirmation-success':
      message = 'Tu cuenta ha sido creada y puedes iniciar sesión';
      variant = 'success';
      break;
    case 'desconfirmation-success':
      message = 'Tu cuenta ha sido eliminada, esperamos verte pronto';
      variant = 'success';
      break;
    case 'invalid':
      message = 'Lo sentimos, el link ha expirado :(';
      variant = 'danger';
      break;
    default:
      return <Navigate replace to="/" />;
  }
  return (
    <Container>
      <Alert variant={variant}>
        {
          ['confirmation-success', 'desconfirmation-success'].includes(status) ? <h3 className="text-center">Listo!</h3> : null
        }
        <p>{message}</p>
      </Alert>
      {
        status === 'confirmation-success'
          ? (
            <Button type="button" className="w-100" onClick={() => navigate('auth/login')}>
              Iniciar sesión
            </Button>
          ) : null
      }
    </Container>
  );
};
