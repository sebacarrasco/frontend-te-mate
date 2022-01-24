import React from 'react';
import { useDispatch } from 'react-redux';
import {
  LeadingActions,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import PropTypes from 'prop-types';
import { setChallengeModal } from '../../actions/challenges';
import { openChallengeModal } from '../../actions/ui';

export const LeftActions = ({ challenge }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(openChallengeModal());
    dispatch(setChallengeModal('edit', challenge));
  };

  return (
    <LeadingActions>
      <SwipeAction
        onClick={handleEdit}
        tag="button"
        className="btn btn-warning d-flex align-items-center"
      >
        <i className="fas fa-pen" />
      </SwipeAction>
    </LeadingActions>
  );
};

LeftActions.propTypes = {
  challenge: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
};

export const RightActions = ({ challenge }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(openChallengeModal());
    dispatch(setChallengeModal('delete', challenge));
  };

  return (
    <TrailingActions>
      <SwipeAction
        onClick={handleDelete}
        tag="button"
        className="btn btn-danger d-flex align-items-center"
      >
        <i className="fas fa-trash" />
      </SwipeAction>
    </TrailingActions>
  );
};

RightActions.propTypes = {
  challenge: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
};
