import React, { useEffect } from 'react';
import {
  Container, Form, Button, FloatingLabel, Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startCreatingGame } from '../../actions/games';
import { UsersSelector } from '../users/UsersSelector';

export const GameNewScreen = () => {
  const dispatch = useDispatch();
  const { selectedUsers } = useSelector((state) => state.users);
  const { newGameId } = useSelector((state) => state.games);
  const { newGameLoading } = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const [formValues, handleInputChange] = useForm({
    name: '',
  });
  const { name } = formValues;

  useEffect(() => {
    if (newGameId !== '') { navigate(`../${newGameId}`); }
  }, [navigate, newGameId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 2) {
      Swal.fire('El nombre debe contener por lo menos dos caracteres', '', 'error');
    } else if (selectedUsers.length < 2) {
      Swal.fire('Debes seleccionar por lo menos a dos participantes', '(sin considerarte)', 'error');
    } else {
      dispatch(startCreatingGame(name, selectedUsers));
    }
  };

  return (
    <Container>
      <h2 className="text-center">Crea un juego</h2>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel
          controlId="floatingInput"
          label="Nombre del juego"
          className="mb-3 mt-3"
        >
          <Form.Control
            type="text"
            name="name"
            placeholder="Un nombre para el juego"
            value={name}
            onChange={handleInputChange}
            required="required"
          />
        </FloatingLabel>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="mt-1">Participantes</Form.Label>
          <UsersSelector />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-3" disabled={newGameLoading}>
          {
            newGameLoading ? (
              <Spinner animation="border" variant="light" />
            ) : 'Crear'
          }
        </Button>
      </Form>
    </Container>
  );
};
