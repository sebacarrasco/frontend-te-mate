import React from 'react';
import PropTypes from 'prop-types';

export const GameStatus = ({ status }) => {
  if (status === 'setup') {
    return (
      <>
        <i className="fas fa-cog" />
        {' '}
        En preparación
        {' '}
        <i className="fas fa-cog" />
      </>
    );
  }

  return (
    <>
      <i className="fas fa-play-circle" />
      {' '}
      En progreso
      {' '}
      <i className="fas fa-play-circle" />
    </>
  );
};

GameStatus.propTypes = {
  status: PropTypes.string.isRequired,
};
