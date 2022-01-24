import React from 'react';
import {
  Container,
  Form,
  Button,
  FloatingLabel,
  Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loginLoading } = useSelector((state) => state.ui);
  const [formValues, handleInputChange] = useForm({
    email: '',
    password: '',
  });
  const { email, password } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      Swal.fire('El email ingresado es inválido', '', 'error');
    } else if (password.length < 6) {
      Swal.fire('Los datos ingresados ingresados no son válidos', '', 'error');
    } else {
      dispatch(startLogin(email, password));
    }
  };

  return (
    <Container>
      <h2 className="text-center">Ingresa a tu cuenta</h2>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel
          controlId="floatingInput"
          label="Correo electrónico"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="temate@gmail.com"
            name="email"
            value={email}
            onChange={handleInputChange}
            required="required"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Contraseña"
          className="mb-3"
        >
          <Form.Control
            type="password"
            autoComplete="off"
            name="password"
            value={password}
            onChange={handleInputChange}
            required="required"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          />
        </FloatingLabel>
        <Button variant="primary" type="submit" className="w-100" disabled={loginLoading}>
          {
            loginLoading ? (
              <Spinner
                animation="border"
                variant="light"
              />
            ) : 'Ingresar'
          }
        </Button>
      </Form>
      <p className="mt-3 px-3 text-center">
        No tienes una cuenta?
        {' '}
        <Link to="/auth/register" className="link-primary">Crea una aquí</Link>
      </p>
    </Container>
  );
};
