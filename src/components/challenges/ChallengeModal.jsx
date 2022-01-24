import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearChallengeModal,
  startUpdatingChallenge,
  startCreatingChallenge,
  startDeletingChallenge,
} from '../../actions/challenges';
import { closeChallengeModal } from '../../actions/ui';
import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../ui/Loading';

const titles = {
  create: 'Nuevo reto',
  edit: 'Editar reto',
  delete: 'Eliminar reto',
};

const buttonTexts = {
  create: 'Crear',
  edit: 'Guardar cambios',
  delete: 'Eliminar',
};

const variants = {
  create: 'success',
  edit: 'primary',
  delete: 'danger',
};

export const ChallengeModal = () => {
  const { userId } = useAuth();
  const dispatch = useDispatch();
  const { challengeModalOpen, challengeModalLoading } = useSelector((state) => state.ui);
  const { mode, challenge } = useSelector((state) => state.challenges);
  const [description, setDescription] = useState(challenge.description);

  useEffect(() => {
    setDescription(challenge.description);
  }, [challenge]);

  const handleClose = () => {
    dispatch(closeChallengeModal());
    dispatch(clearChallengeModal());
  };

  const handleSubmit = () => {
    if (mode === 'edit') {
      dispatch(startUpdatingChallenge(challenge.id, description, challenge.userId, userId));
    } else if (mode === 'create') {
      dispatch(startCreatingChallenge(description, challenge.userId, userId));
    } else if (mode === 'delete') {
      dispatch(startDeletingChallenge(challenge.id, challenge.userId, userId));
    }
  };

  return (
    <Modal show={challengeModalOpen} onHide={handleClose} centered backdrop={challengeModalLoading ? 'static' : 'true'}>
      <Modal.Header closeButton>
        <Modal.Title>
          {titles[mode]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              {mode === 'delete' ? '¿Confirmas que quieres eliminar este reto?' : 'Descripción'}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              placeholder="Escribe una descripción del reto"
              name="description"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              required="required"
              disabled={mode === 'delete'}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {
          challengeModalLoading
            ? <Loading />
            : (
              <>
                <Button variant="secondary" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button
                  variant={variants[mode]}
                  onClick={handleSubmit}
                  disabled={description.length < 5}
                >
                  {buttonTexts[mode]}
                </Button>
              </>
            )
        }
      </Modal.Footer>
    </Modal>
  );
};
