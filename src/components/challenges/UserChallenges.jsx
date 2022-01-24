import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from 'react-bootstrap';
import {
  SwipeableList,
  SwipeableListItem,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { useDispatch } from 'react-redux';
import {
  LeftActions,
  RightActions,
} from '../ui/ActionsSwipeChallenge';
import { ChallengeModal } from './ChallengeModal';
import { openChallengeModal } from '../../actions/ui';
import { setChallengeModal } from '../../actions/challenges';

export const UserChallenges = ({ challenges, userId }) => {
  const dispatch = useDispatch();
  const nonSelectedChallenges = challenges.filter((c) => !c.selected);
  const badgeVariant = nonSelectedChallenges.length < 2 ? 'danger' : 'primary';

  const handleCreate = () => {
    dispatch(openChallengeModal());
    dispatch(setChallengeModal('create', { id: '0', userId, description: '' }));
  };

  return (
    <>
      <Container fluid>
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <Row>
              <Col className="pe-0">
                <Button
                  variant="success"
                  size="sm"
                  className="d-flex align-items-center"
                  onClick={handleCreate}
                >
                  <i className="fas fa-plus" />
                </Button>
              </Col>
              <Col>
                Retos
              </Col>
            </Row>
            <div>
              <Badge bg={badgeVariant} pill>
                {nonSelectedChallenges.length}
              </Badge>
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Text className="mb-0">
              {
                nonSelectedChallenges.length === 0
                  ? 'Este usuario no tiene retos'
                  : 'Desliza hacia los lados sobre un reto para editarlo o eliminarlo'
              }
            </Card.Text>
            <ListGroup variant="flush">
              {
                nonSelectedChallenges.map((challenge) => (
                  <ListGroup.Item variant="light" className="mt-2 rounded" key={challenge.id}>
                    <SwipeableList>
                      <SwipeableListItem
                        leadingActions={LeftActions({ challenge })}
                        trailingActions={RightActions({ challenge })}
                      >
                        {challenge.description}
                      </SwipeableListItem>
                    </SwipeableList>
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
      <ChallengeModal />
    </>
  );
};

UserChallenges.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.string.isRequired,
};
