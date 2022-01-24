import { api } from '../api/api';
import { types } from '../types/types';
import {
  finishUsersLoading,
  startUsersLoading,
  startUserLoading,
  finishUserLoading,
} from './ui';

export const setUsers = (users) => ({
  type: types.setUsers,
  payload: users,
});

export const startGettingUsers = () => async (dispatch, getState) => {
  dispatch(startUsersLoading());
  const { token } = getState().auth;
  try {
    const { data: { users } } = await api.get('users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setUsers(users));
    dispatch(finishUsersLoading());
  } catch (e) {
    const errorCode = e.response ? e.response.status : 500;
    dispatch(finishUsersLoading(errorCode));
  }
};

export const setUser = (user) => ({
  type: types.setUser,
  payload: user,
});

export const startGettingUser = (userId, isCurrentUser) => async (dispatch, getState) => {
  dispatch(startUserLoading());
  const { token } = getState().auth;
  const endpoint = isCurrentUser ? '' : '/challenges';
  try {
    const { data: { user } } = await api.get(`users/${userId}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setUser(user));
    dispatch(finishUserLoading());
  } catch (e) {
    const errorCode = e.response ? e.response.status : 500;
    dispatch(finishUserLoading(errorCode));
  }
};

export const setSelectedUsers = (users) => ({
  type: types.setSelectedUsers,
  payload: users,
});
