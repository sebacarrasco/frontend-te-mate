import Swal from 'sweetalert2';
import { api } from '../api/api';
import { types } from '../types/types';
import {
  startGamesLoading,
  finishGamesLoading,
  startNewGameLoading,
  finishNewGameLoading,
  startGameLoading,
  finishGameLoading,
  startGameAdminLoading,
  finishGameAdminLoading,
  startGameModalLoading,
  closeGameModal,
  finishGameModalLoading,
} from './ui';
import { setSelectedUsers } from './users';

export const setGames = (games) => ({
  type: types.setGames,
  payload: games,
});

export const startGettingGames = () => async (dispatch, getState) => {
  dispatch(startGamesLoading());
  const { token } = getState().auth;
  try {
    const { data: { games } } = await api.get('games', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setGames(games));
    dispatch(finishGamesLoading());
  } catch (e) {
    const errorCode = e.response ? e.response.status : 500;
    dispatch(finishGamesLoading(errorCode));
  }
};

export const setNewGameId = (gameId) => ({
  type: types.setNewGameId,
  payload: gameId,
});

// eslint-disable-next-line max-len
export const startCreatingGame = (name, selectedUsers) => async (dispatch, getState) => {
  dispatch(startNewGameLoading());
  try {
    const { token } = getState().auth;
    const userIds = selectedUsers.map((s) => s.value);
    const { data: { game } } = await api.post('games', { name, userIds }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setNewGameId(game.id));
    dispatch(setSelectedUsers([]));
    Swal.fire('Juego creado', '', 'success');
  } catch (e) {
    let message;
    switch (e.response ? e.response.status : 0) {
      case 406:
        message = 'Deben ser en total al menos 3 participantes para crear un juego';
        break;
      case 404:
        message = 'No todos los usuarios seleccionados se pudieron encontrar';
        break;
      case 401:
        message = 'No tienes autorización para crear juegos';
        break;
      case 400:
        message = 'Los datos ingresados ingresados no son válidos';
        break;
      default:
        message = 'Ha ocurrido un error, por favor vuelve a intentarlo';
        break;
    }
    Swal.fire(message, '', 'error');
  }
  dispatch(finishNewGameLoading());
};

export const setGame = (game) => ({
  type: types.setGame,
  payload: game,
});

export const startGettingGame = (gameId) => async (dispatch, getState) => {
  dispatch(startGameLoading());
  const { token } = getState().auth;
  try {
    const { data: { game } } = await api.get(`games/${gameId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setGame(game));
    dispatch(finishGameLoading());
  } catch (e) {
    const errorCode = e.response ? e.response.status : 500;
    dispatch(finishGameLoading(errorCode));
  }
};

// eslint-disable-next-line max-len
export const startUpdatingGameName = (gameId, name) => async (dispatch, getState) => {
  dispatch(startGameAdminLoading());
  const { token } = getState().auth;
  try {
    await api.patch(`games/${gameId}`, { name }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire('Nombre actualizado', '', 'success');
    dispatch(startGettingGame(gameId));
  } catch (e) {
    let message;
    switch (e.response ? e.response.status : 0) {
      case 404:
        message = 'No se pudo encontrar el juego que intentaste editar';
        break;
      case 403:
        message = 'No puedes modificar un juego en el que no eres admin';
        break;
      case 401:
        message = 'No estás autorizado para editar juegos';
        break;
      case 400:
        message = 'Los datos ingresados no son válidos';
        break;
      default:
        message = 'Ha ocurrido un error, por favor vuelve a intentarlo';
        break;
    }
    Swal.fire(message, '', 'error');
  }
  dispatch(finishGameAdminLoading());
};

// eslint-disable-next-line max-len
export const startUpdatingGameStatus = (gameId, status) => async (dispatch, getState) => {
  dispatch(startGameModalLoading());
  const { token } = getState().auth;
  try {
    await api.patch(`games/${gameId}`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire('Juego Comenzado!', '', 'success');
    dispatch(startGettingGame(gameId));
    dispatch(closeGameModal());
  } catch (e) {
    let message;
    switch (e.response ? e.response.status : 0) {
      case 406:
        message = 'No todos los participantes tienen al menos 2 retos';
        dispatch(closeGameModal());
        break;
      case 404:
        message = 'No se pudo encontrar el juego que intentaste empezar';
        dispatch(closeGameModal());
        break;
      case 403:
        message = 'No puedes modificar un juego en el que no eres admin';
        dispatch(closeGameModal());
        break;
      case 401:
        message = 'No estás autorizado para editar juegos';
        dispatch(closeGameModal());
        break;
      case 400:
        message = 'Los datos ingresados no son válidos';
        break;
      default:
        message = 'Ha ocurrido un error, por favor vuelve a intentarlo';
        break;
    }
    Swal.fire(message, '', 'error');
  }
  dispatch(finishGameModalLoading());
};

export const setDeletedGameId = (gameId) => ({
  type: types.setDeletedGameId,
  payload: gameId,
});

// eslint-disable-next-line max-len
export const startDeletingGame = (gameId) => async (dispatch, getState) => {
  dispatch(startGameModalLoading());
  const { token } = getState().auth;
  try {
    await api.delete(`games/${gameId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire('Juego Eliminado', '', 'success');
    dispatch(setDeletedGameId(gameId));
    dispatch(closeGameModal());
  } catch (e) {
    let message;
    switch (e.response ? e.response.status : 0) {
      case 404:
        message = 'No se pudo encontrar el juego que intentaste eliminar';
        dispatch(closeGameModal());
        break;
      case 403:
        message = 'No puedes eliminar un juego en el que no eres admin';
        dispatch(closeGameModal());
        break;
      case 401:
        message = 'No estás autorizado para eliminar juegos';
        dispatch(closeGameModal());
        break;
      case 400:
        message = 'Los datos ingresados no son válidos';
        break;
      default:
        message = 'Ha ocurrido un error, por favor vuelve a intentarlo';
        break;
    }
    Swal.fire(message, '', 'error');
  }
  dispatch(finishGameModalLoading());
};
