import React from 'react';
import {
  Badge, Col, ListGroup, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const renderUserStatus = (user, gameStatus) => {
  if (gameStatus === 'in progress') {
    const badgeStyle = { minWidth: '55px', display: 'inline-block', textAlign: 'center' };
    if (user.gameUser.isAlive) {
      return <small><Badge bg="success" pill style={badgeStyle}>Vivo</Badge></small>;
    }
    return <small><Badge bg="danger" pill style={badgeStyle}>Muerto</Badge></small>;
  }
  return (
    <Badge bg={user.challengesNotSelected < 2 ? 'danger' : 'primary'} pill>
      {user.challengesNotSelected}
    </Badge>
  );
};

export const UserListGame = ({ users, adminId, gameStatus }) => {
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
            <div className="d-flex justify-content-between align-items-center">
              <div className="ms-2 me-auto">
                <div className="fw-bold text-black">{`${user.firstName} ${user.lastName}`}</div>
                {user.email}
              </div>
              <div>
                <Row className="mb-2">
                  {renderUserStatus(user, gameStatus)}
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
            </div>
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  );
};

UserListGame.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    challengesNotSelected: PropTypes.number,
    gameUser: PropTypes.shape({
      isAlive: PropTypes.bool.isRequired,
      kills: PropTypes.number.isRequired,
    }),
  })).isRequired,
  adminId: PropTypes.string,
  gameStatus: PropTypes.string.isRequired,
};

UserListGame.defaultProps = {
  adminId: '',
};
