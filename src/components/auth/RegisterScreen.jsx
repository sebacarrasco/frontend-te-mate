import React from 'react';
import {
  Container,
  Form,
  Button,
  FloatingLabel,
  Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import validator from 'validator';
import { startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { registerLoading } = useSelector((state) => state.ui);
  const [formValues, handleInputChange] = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
  } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName.length < 2) {
      Swal.fire('El nombre ingresado es muy corto', '', 'error');
    } else if (lastName.length < 2) {
      Swal.fire('El apellido ingresado es muy corto', '', 'error');
    } else if (!validator.isEmail(email)) {
      Swal.fire('El correo electrónico ingresado es inválido', '', 'error');
    } else if (password !== passwordConfirmation) {
      Swal.fire('Las contraseñas deben ser iguales', '', 'error');
    } else if (password.length < 6) {
      Swal.fire('La contraseña debe ser de por lo menos 6 caracteres', '', 'error');
    } else {
      dispatch(startRegister(firstName, lastName, email, password));
    }
  };

  return (
    <Container>
      <h2 className="text-center">Crea una cuenta</h2>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingFirstName" label="Nombre" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Jessica"
            name="firstName"
            value={firstName}
            onChange={handleInputChange}
            required="required"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingLastName" label="Apellido" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Graham"
            name="lastName"
            value={lastName}
            onChange={handleInputChange}
            required="required"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingEmail" label="Correo electrónico" className="mb-3">
          <Form.Control
            type="email"
            placeholder="temate@gmail.com"
            name="email"
            value={email}
            onChange={handleInputChange}
            required="required"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3">
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
        <FloatingLabel controlId="floatingPasswordConfirmation" label="Confirmar contraseña" className="mb-3">
          <Form.Control
            type="password"
            autoComplete="off"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={handleInputChange}
            required="required"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          />
        </FloatingLabel>
        <Button variant="primary" type="submit" className="w-100" disabled={registerLoading}>
          {
            registerLoading ? (
              <Spinner animation="border" variant="light" />
            ) : 'Crear'
          }
        </Button>
      </Form>
      <p className="mt-3 px-3 text-center">
        Ya tienes una cuenta?
        {' '}
        <Link to="/auth/login" className="link-primary">Entra aquí</Link>
      </p>
    </Container>
  );
};
