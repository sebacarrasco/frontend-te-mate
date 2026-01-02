import React, { useEffect, useState } from 'react';
import {
  Alert,
  Container,
  Spinner,
  Table,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { api } from '../../api/api';

export const GameActivityTab = ({ gameId }) => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  useEffect(() => {
    const fetchCompletedChallenges = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get(`games/${gameId}/assigned-challenges/completed`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompletedChallenges(data.assignedChallenges);
      } catch (e) {
        setError(e.response?.status || 500);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedChallenges();
  }, [gameId, token]);

  if (loading) {
    return (
      <Container className="text-center py-4">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        Ha ocurrido un error al cargar la actividad del juego
      </Alert>
    );
  }

  return (
    <Container>
      <h4 className="mb-3">Retos completados</h4>
      {completedChallenges.length === 0 ? (
        <Alert variant="info">
          Nadie ha muerto todavía
        </Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Asesino</th>
              <th>Víctima</th>
              <th>Reto</th>
            </tr>
          </thead>
          <tbody>
            {completedChallenges.map((challenge) => (
              <tr key={challenge.id}>
                <td>
                  {challenge.killer.firstName}
                  {' '}
                  {challenge.killer.lastName}
                </td>
                <td>
                  {challenge.victim.firstName}
                  {' '}
                  {challenge.victim.lastName}
                </td>
                <td>{challenge.challenge.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

GameActivityTab.propTypes = {
  gameId: PropTypes.string.isRequired,
};
