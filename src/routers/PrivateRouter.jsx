import React from 'react';
import {
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { GameNewScreen } from '../components/games/GameNewScreen';
import { GameShowScreen } from '../components/games/GameShowScreen';
import { GamesIndexScreen } from '../components/games/GamesIndexScreen';
import { UserProfileScreen } from '../components/users/UserProfileScreen';
import { UsersIndexScreen } from '../components/users/UsersIndexScreen';

export const PrivateRouter = () => (
  <Routes>
    <Route path="users" element={<Outlet />}>
      <Route path="" element={<UsersIndexScreen />} />
      <Route path=":userId" element={<UserProfileScreen />} />
    </Route>
    <Route path="games" element={<Outlet />}>
      <Route path="" element={<GamesIndexScreen />} />
      <Route path="new" element={<GameNewScreen />} />
      <Route path=":gameId" element={<GameShowScreen />} />
    </Route>
    <Route path="*" element={<Navigate replace to="/" />} />
  </Routes>
);
