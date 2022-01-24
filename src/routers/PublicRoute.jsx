import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = ({ children, redirectTo, isLogged }) => (
  isLogged ? <Navigate to={redirectTo} /> : children
);

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
};
