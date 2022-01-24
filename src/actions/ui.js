import { types } from '../types/types';

export const startLoginLoading = () => ({
  type: types.startLoginLoading,
});

export const finishLoginLoading = () => ({
  type: types.finishLoginLoading,
});

export const startRegisterLoading = () => ({
  type: types.startRegisterLoading,
});

export const finishRegisterLoading = () => ({
  type: types.finishRegisterLoading,
});

export const startUsersLoading = () => ({
  type: types.startUsersLoading,
});

export const finishUsersLoading = (error = '') => ({
  type: types.finishUsersLoading,
  payload: error,
});

export const startUserLoading = () => ({
  type: types.startUserLoading,
});

export const finishUserLoading = (error = '') => ({
  type: types.finishUserLoading,
  payload: error,
});

export const startChallengeModalLoading = () => ({
  type: types.startChallengeModalLoading,
});

export const finishChallengeModalLoading = () => ({
  type: types.finishChallengeModalLoading,
});

export const openChallengeModal = () => ({
  type: types.openChallengeModal,
});

export const closeChallengeModal = () => ({
  type: types.closeChallengeModal,
});

export const startGamesLoading = () => ({
  type: types.startGamesLoading,
});

export const finishGamesLoading = (error = '') => ({
  type: types.finishGamesLoading,
  payload: error,
});

export const startNewGameLoading = () => ({
  type: types.startNewGameLoading,
});

export const finishNewGameLoading = () => ({
  type: types.finishNewGameLoading,
});

export const startGameLoading = () => ({
  type: types.startGameLoading,
});

export const finishGameLoading = (error = '') => ({
  type: types.finishGameLoading,
  payload: error,
});

export const startGameAdminLoading = () => ({
  type: types.startGameAdminLoading,
});

export const finishGameAdminLoading = () => ({
  type: types.finishGameAdminLoading,
});

export const startGameModalLoading = () => ({
  type: types.startGameModalLoading,
});

export const finishGameModalLoading = () => ({
  type: types.finishGameModalLoading,
});

export const openGameModal = (mode) => ({
  type: types.openGameModal,
  payload: mode,
});

export const closeGameModal = () => ({
  type: types.closeGameModal,
});
