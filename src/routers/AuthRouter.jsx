import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AccountConfirmationScreen } from '../components/auth/AccountConfirmationScreen';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => (
  <Routes>
    <Route path="login" element={<LoginScreen />} />
    <Route path="register" element={<RegisterScreen />} />
    <Route path="account-confirmation/:status" element={<AccountConfirmationScreen />} />
    <Route path="*" element={<Navigate replace to="/auth/login" />} />
  </Routes>
);
