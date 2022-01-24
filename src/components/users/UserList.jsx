import React from 'react';
import {
  Badge, Col, ListGroup, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const UserList = ({ users, mode, adminId }) => {
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
              {
                mode === 'game'
                  ? (
                    <div>
                      <Row className="mb-2">
                        <Badge bg={user.challengesNotSelected < 2 ? 'danger' : 'primary'} pill>
                          {user.challengesNotSelected}
                        </Badge>
                      </Row>
                      {
                        user.id === adminId
                          ? (
                            <Col className="d-flex align-items-center justify-content-center">
                              <Row>
                                <i className="fas fa-user-tie p-0" />
                              </Row>
                            </Col>
                          )
                          : null
                      }
                    </div>
                  ) : null
              }
            </div>
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,
  mode: PropTypes.string.isRequired,
  adminId: PropTypes.string,
};

UserList.defaultProps = {
  adminId: '',
};
