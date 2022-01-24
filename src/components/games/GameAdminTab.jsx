import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startUpdatingGameName } from '../../actions/games';
import { openGameModal } from '../../actions/ui';
import { GameConfirmationModal } from './GameConfirmationModal';

export const GameAdminTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gameAdminLoading: loading } = useSelector((state) => state.ui);
  const { game, deletedGameId } = useSelector((state) => state.games);
  const [formValues, handleInputChange] = useForm({
    name: game.name,
  });
  const { name } = formValues;

  const handleChangeName = () => {
    if (name.length < 2) {
      Swal.fire('El nombre debe contener por lo menos dos caracteres', '', 'error');
    } else {
      dispatch(startUpdatingGameName(game.id, name));
    }
  };

  useEffect(() => {
    if (deletedGameId !== '') { navigate('/games'); }
  }, [deletedGameId, navigate]);

  return (
    <>
      <Container>
        <Card className="mb-3">
          <Card.Header className="d-flex justify-content-between">
            Nombre del juego
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Un nombre para el juego"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    required="required"
                  />
                </Form.Group>
              </Col>
              <Col xs="2" className="ps-0">
                <Button
                  variant="primary"
                  type="button"
                  disabled={loading || game.name === name}
                  onClick={handleChangeName}
                >
                  {
                    loading
                      ? <Spinner animation="border" variant="light" size="sm" />
                      : <i className="fas fa-save" />
                  }
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Header>
            {
              game.status === 'setup'
                ? <i className="fas fa-cog" />
                : <i className="fas fa-play-circle" />
            }
            {' '}
            Estado del juego
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                {game.status === 'setup' ? 'En preparación' : 'En progreso' }
              </Col>
              {
                game.status === 'setup'
                  ? (
                    <Col>
                      <Button
                        variant="primary"
                        type="button"
                        disabled={loading}
                        onClick={() => dispatch(openGameModal('status'))}
                        size="sm"
                      >
                        Empezar juego
                      </Button>
                    </Col>
                  )
                  : null
              }
            </Row>
          </Card.Body>
        </Card>
        <div className="d-flex justify-content-center">
          <Button
            className="mt-2"
            variant="danger"
            type="button"
            disabled={loading}
            onClick={() => dispatch(openGameModal('delete'))}
          >
            Eliminar juego
          </Button>
        </div>
      </Container>
      <GameConfirmationModal />
    </>
  );
};
