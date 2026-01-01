import React from 'react';
import {
  Badge, Col, Dropdown, ListGroup, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { startKillingUser } from '../../actions/games';
import { useAuth } from '../../hooks/useAuth';

const renderUserStatus = (user, gameStatus) => {
  if (gameStatus !== 'setup') {
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

export const UserListGame = ({
  users, adminId, gameStatus, gameId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useAuth();
  const isAdmin = userId === adminId;

  const sortedUsers = gameStatus !== 'setup'
    ? [...users].sort((a, b) => b.gameUser.isAlive - a.gameUser.isAlive)
    : users;

  const handleKillUser = (e, user) => {
    e.stopPropagation();
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres marcar a ${user.firstName} ${user.lastName} como muerto?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, marcar como muerto',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startKillingUser(gameId, user.id));
      }
    });
  };

  return (
    <ListGroup variant="flush">
      {
        sortedUsers.map((user) => (
          <ListGroup.Item
            key={user.id}
            variant="light"
            className="mt-2 rounded px-1"
            action
            onClick={() => navigate(`/users/${user.id}`)}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                {
                  isAdmin && gameStatus === 'in progress' && user.gameUser.isAlive
                    ? (
                      <Dropdown onClick={(e) => e.stopPropagation()}>
                        <Dropdown.Toggle
                          variant="link"
                          className="text-dark p-0"
                          id={`dropdown-${user.id}`}
                          bsPrefix="dropdown-toggle-no-caret"
                        >
                          <i className="fas fa-ellipsis-v" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={(e) => handleKillUser(e, user)}>
                            <i className="fas fa-skull-crossbones me-2 text-danger" />
                            Marcar como muerto
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )
                    : null
                }
                <div className="ms-2 me-auto">
                  <div className="fw-bold text-black">{`${user.firstName} ${user.lastName}`}</div>
                  {user.email}
                </div>
              </div>
              <div className="d-flex align-items-center">
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
  gameId: PropTypes.string.isRequired,
};

UserListGame.defaultProps = {
  adminId: '',
};
