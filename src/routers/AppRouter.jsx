import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { logout } from '../actions/auth';
import { HomeScreen } from '../components/home/HomeScreen';
import { Navbar } from '../components/ui/Navbar';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PrivateRouter } from './PrivateRouter';
import { PublicRoute } from './PublicRoute';
import { useAuth } from '../hooks/useAuth';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLogged } = useAuth();

  useEffect(() => {
    try {
      if (token) {
        const { exp, sub } = jwtDecode(token);
        const remainingTime = new Date(exp * 1000).getTime() - new Date().getTime();
        if (remainingTime <= 0 || !validator.isUUID(sub, 4)) {
          throw Error;
        } else {
          setTimeout(() => dispatch(logout()), remainingTime);
        }
      } else {
        throw TypeError;
      }
    } catch (e) {
      dispatch(logout());
    }
  }, [token, dispatch, logout]);

  return (
    <Router>
      <Navbar />
      <Container className="mt-3">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route
            path="auth/*"
            element={(
              <PublicRoute redirectTo="/" isLogged={isLogged}>
                <AuthRouter />
              </PublicRoute>
            )}
          />
          <Route
            path="/*"
            element={(
              <PrivateRoute redirectTo="/" isLogged={isLogged}>
                <PrivateRouter />
              </PrivateRoute>
            )}
          />
        </Routes>
      </Container>
    </Router>
  );
};
