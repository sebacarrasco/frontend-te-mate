import React, { useEffect } from 'react';
import {
  Container, ListGroup, Row, Col, Alert, Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDeletedGameId, startGettingGames } from '../../actions/games';
import { Loading } from '../ui/Loading';

export const GamesIndexScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.ui.gamesLoading);
  const { games, deletedGameId } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(startGettingGames());
  }, [dispatch, startGettingGames]);

  useEffect(() => {
    if (deletedGameId !== '') { dispatch(setDeletedGameId('')); }
  }, [setDeletedGameId, dispatch, deletedGameId]);

  if (loading) {
    return <Loading />;
  }
  if (error === 401) {
    return <Alert variant="danger">No tienes autorización para ver juegos</Alert>;
  }
  if (error !== '') {
    return <Alert variant="danger">Ha ocurrido un error, vuelve a intentarlo recargando la página</Alert>;
  }

  return (
    <Container fluid>
      <Row>
        <Col className="d-flex justify-content-end pe-4">
          <Button
            variant="success"
            size="sm"
            className="d-flex align-items-center"
            onClick={() => navigate('new')}
          >
            <i className="fas fa-plus" />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup variant="flush">
            {
              games.map((game) => (
                <ListGroup.Item
                  key={game.id}
                  variant="light"
                  className="mt-2 rounded"
                  action
                  onClick={() => navigate(`${game.id}`)}
                >
                  <Row className="d-flex justify-content-between">
                    <Col>
                      {game.name}
                    </Col>
                    <Col xs={2} className="d-flex align-items-center">
                      {
                        game.status === 'setup'
                          ? <i className="fas fa-cogs" />
                          : <i className="fas fa-play" />
                      }
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
