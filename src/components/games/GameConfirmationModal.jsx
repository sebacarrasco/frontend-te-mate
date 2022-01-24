import React from 'react';
import {
  Button, Col, Container, Modal, Row,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { startDeletingGame, startUpdatingGameStatus } from '../../actions/games';
import { closeGameModal } from '../../actions/ui';
import { Loading } from '../ui/Loading';

export const GameConfirmationModal = () => {
  const dispatch = useDispatch();
  const {
    gameModalOpen,
    gameModalLoading: loading,
    gameModalMode: mode,
  } = useSelector((state) => state.ui);
  const { game } = useSelector((state) => state.games);

  const handleSubmit = () => {
    if (mode === 'status') {
      dispatch(startUpdatingGameStatus(game.id, 'in progress'));
    } else if (mode === 'delete') {
      dispatch(startDeletingGame(game.id));
    }
  };

  return (
    <Modal
      show={gameModalOpen}
      onHide={() => dispatch(closeGameModal())}
      centered
      backdrop={loading ? 'static' : 'true'}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === 'status' ? 'Comenzar juego' : 'Eliminar juego'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="pb-4">
            <Col className="d-flex justify-content-center">
              <i className="fas fa-exclamation-circle fa-5x text-warning" />
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              ¿Confirmas que quieres
              {mode === 'status' ? ' comenzar el juego?' : ' eliminar el juego?'}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        {
          loading
            ? <Loading />
            : (
              <>
                <Button
                  variant="secondary"
                  onClick={() => dispatch(closeGameModal())}
                >
                  Cancelar
                </Button>
                <Button
                  variant={mode === 'status' ? 'primary' : 'danger'}
                  onClick={handleSubmit}
                >
                  Confirmar
                </Button>
              </>
            )
        }
      </Modal.Footer>
    </Modal>
  );
};
