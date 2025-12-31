import React, { useEffect } from 'react';
import {
  Alert, Container, Tab, Tabs,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setNewGameId, startGettingGame } from '../../actions/games';
import { useAuth } from '../../hooks/useAuth';
import { ChallengeCard } from '../challenges/ChallengeCard';
import { Loading } from '../ui/Loading';
import { UserCard } from '../users/UserCard';
import { UserListGame } from '../users/UserListGame';
import { GameAdminTab } from './GameAdminTab';
import { GameStatus } from './GameStatus';

export const GameShowScreen = () => {
  const dispatch = useDispatch();
  const { gameId } = useParams();
  const { loading, error } = useSelector((state) => state.ui.gameLoading);
  const { game } = useSelector((state) => state.games);
  const { newGameId } = useSelector((state) => state.games);
  const { userId } = useAuth();

  useEffect(() => {
    if (newGameId !== '') { dispatch(setNewGameId('')); }
  }, [newGameId, dispatch, setNewGameId]);

  useEffect(() => {
    dispatch(startGettingGame(gameId));
  }, [dispatch, startGettingGame, gameId]);

  if (loading) {
    return <Loading />;
  }
  if (error === 404) {
    return <Alert variant="danger">No se encontró al juego que buscas</Alert>;
  }
  if (error === 401) {
    return <Alert variant="danger">No tienes autorización para ver este juego</Alert>;
  }
  if (error === 400) {
    return <Alert variant="danger">Los datos ingresados para encontrar al juego son inválidos</Alert>;
  }
  if (error !== '') {
    return <Alert variant="danger">Ha ocurrido un error, vuelve a intentarlo recargando la página</Alert>;
  }
  return (
    <Container>
      <h2 className="text-center">{game.name}</h2>
      <div className="text-center mb-3">
        <small>
          <GameStatus status={game.status} />
        </small>
      </div>
      <Tabs
        defaultActiveKey="participants"
        className="mb-3"
      >
        <Tab
          eventKey="participants"
          tabClassName="text-black"
          title={(
            <>
              Participantes
              {' '}
              (
              {game.participants.length}
              )
            </>
          )}
        >
          <UserListGame
            users={game.participants}
            adminId={game.ownerId}
            gameStatus={game.status}
            gameId={gameId}
          />
        </Tab>
        {
          game.status === 'in progress'
            ? (
              <Tab eventKey="victim" title="Víctima" tabClassName="text-black">
                <UserCard user={game.victim} />
                <ChallengeCard challenge={game.challenge.description} />
              </Tab>
            )
            : null
        }
        {
          userId === game.ownerId
            ? (
              <Tab
                eventKey="admin"
                title={<i className="fas fa-user-tie fa-lg" />}
                tabClassName="text-black"
              >
                <GameAdminTab game={game} />
              </Tab>
            )
            : null
        }
      </Tabs>
    </Container>
  );
};
