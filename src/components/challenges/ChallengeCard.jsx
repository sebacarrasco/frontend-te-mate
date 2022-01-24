import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export const ChallengeCard = ({ challenge }) => (
  <Card className="mb-3">
    <Card.Header className="d-flex justify-content-between">
      Reto
    </Card.Header>
    <Card.Body>
      <Card.Text>{challenge}</Card.Text>
    </Card.Body>
  </Card>
);

ChallengeCard.propTypes = {
  challenge: PropTypes.string.isRequired,
};
