import React from 'react';
import { Alert, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const AssignedChallengesTable = ({ challenges, emptyMessage }) => {
  if (challenges.length === 0) {
    return (
      <Alert variant="info">
        {emptyMessage}
      </Alert>
    );
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Asesino</th>
          <th>Víctima</th>
          <th>Reto</th>
        </tr>
      </thead>
      <tbody>
        {challenges.map((challenge) => (
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
  );
};

AssignedChallengesTable.propTypes = {
  challenges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      killer: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
      }).isRequired,
      victim: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
      }).isRequired,
      challenge: PropTypes.shape({
        description: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  emptyMessage: PropTypes.string.isRequired,
};
