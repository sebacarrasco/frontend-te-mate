import React, { useEffect, useState } from 'react';
import {
  Alert,
  Container,
  Spinner,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { api } from '../../api/api';
import { AssignedChallengesTable } from './AssignedChallengesTable';

export const GameActivityTab = ({ gameId, isUserAlive, gameStatus }) => {
  const { token } = useSelector((state) => state.auth);
  const [loadingCompletedChallenges, setLoadingCompletedChallenges] = useState(true);
  const [loadingOngoingChallenges, setLoadingOngoingChallenges] = useState(false);
  const [errorCompletedChallenges, setErrorCompletedChallenges] = useState(null);
  const [errorOngoingChallenges, setErrorOngoingChallenges] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [ongoingChallenges, setOngoingChallenges] = useState([]);

  const showOngoingSection = !isUserAlive && gameStatus === 'in progress';

  useEffect(() => {
    const fetchCompletedChallenges = async () => {
      setLoadingCompletedChallenges(true);
      setErrorCompletedChallenges(null);
      try {
        const { data } = await api.get(`games/${gameId}/assigned-challenges/completed`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompletedChallenges(data.assignedChallenges);
      } catch (e) {
        setErrorCompletedChallenges(e.response?.status || 500);
      } finally {
        setLoadingCompletedChallenges(false);
      }
    };

    fetchCompletedChallenges();
  }, [gameId, token]);

  useEffect(() => {
    if (!showOngoingSection) {
      return;
    }

    const fetchOngoingChallenges = async () => {
      setLoadingOngoingChallenges(true);
      setErrorOngoingChallenges(null);
      try {
        const { data } = await api.get(`games/${gameId}/assigned-challenges/ongoing`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOngoingChallenges(data.assignedChallenges);
      } catch (e) {
        setErrorOngoingChallenges(e.response?.status || 500);
      } finally {
        setLoadingOngoingChallenges(false);
      }
    };

    fetchOngoingChallenges();
  }, [gameId, token, showOngoingSection]);

  const isLoading = loadingCompletedChallenges || (showOngoingSection && loadingOngoingChallenges);

  if (isLoading) {
    return (
      <Container className="text-center py-4">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container>
      <h4 className="mb-3">Retos completados</h4>
      {errorCompletedChallenges ? (
        <Alert variant="danger">
          Ha ocurrido un error al cargar los retos completados
        </Alert>
      ) : (
        <AssignedChallengesTable
          challenges={completedChallenges}
          emptyMessage="Nadie ha muerto todavía"
        />
      )}

      {showOngoingSection && (
        <>
          <h4 className="mb-3 mt-4">Retos en curso</h4>
          {errorOngoingChallenges ? (
            <Alert variant="danger">
              Ha ocurrido un error al cargar los retos en curso
            </Alert>
          ) : (
            <AssignedChallengesTable
              challenges={ongoingChallenges}
              emptyMessage="No hay retos en curso"
            />
          )}
        </>
      )}
    </Container>
  );
};

GameActivityTab.propTypes = {
  gameId: PropTypes.string.isRequired,
  isUserAlive: PropTypes.bool.isRequired,
  gameStatus: PropTypes.string.isRequired,
};
