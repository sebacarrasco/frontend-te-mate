import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ children, redirectTo, isLogged }) => (
  isLogged ? children : <Navigate to={redirectTo} />
);

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
};
