import React from 'react';
import PropTypes from 'prop-types';
import { getGameStatusTranslation } from '../../utils';

export const GameStatus = ({ status }) => {
  const translation = getGameStatusTranslation(status);
  const icon = {
    setup: <i className="fas fa-cog" />,
    'in progress': <i className="fas fa-play-circle" />,
    completed: <i className="fas fa-check-circle" />,
  }[status];
  return (
    <>
      {icon}
      {' '}
      {translation}
      {' '}
      {icon}
    </>
  );
};

GameStatus.propTypes = {
  status: PropTypes.string.isRequired,
};
