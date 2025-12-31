import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const UserListIndex = ({ users }) => {
  const navigate = useNavigate();

  return (
    <ListGroup variant="flush">
      {
        users.map((user) => (
          <ListGroup.Item
            key={user.id}
            variant="light"
            className="mt-2 rounded"
            action
            onClick={() => navigate(`/users/${user.id}`)}
          >
            <div className="d-flex justify-content-between">
              <div className="ms-2 me-auto">
                <div className="fw-bold text-black">{`${user.firstName} ${user.lastName}`}</div>
                {user.email}
              </div>
            </div>
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  );
};

UserListIndex.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,
};
