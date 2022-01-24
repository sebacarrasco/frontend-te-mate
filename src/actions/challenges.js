import Swal from 'sweetalert2';
import { api } from '../api/api';
import { types } from '../types/types';
import { closeChallengeModal, finishChallengeModalLoading, startChallengeModalLoading } from './ui';
import { startGettingUser } from './users';

export const setChallengeModal = (mode, challenge) => ({
  type: types.setChallengeModal,
  payload: {
    mode,
    challenge,
  },
});

export const clearChallengeModal = () => ({
  type: types.clearChallengeModal,
});

// eslint-disable-next-line max-len
export const startUpdatingChallenge = (challengeId, description, ownerId, currentUserId) => async (dispatch, getState) => {
  dispatch(startChallengeModalLoading());
  const { token } = getState().auth;
  try {
    await api.patch(`challenges/${challengeId}`, { description }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire('Reto actualizado', '', 'success');
    dispatch(startGettingUser(ownerId, ownerId === currentUserId));
    dispatch(closeChallengeModal());
  } catch (e) {
    let message;
    switch (e.response ? e.response.status : 0) {
      case 404:
        message = 'No se pudo encontrar el desafío que intentaste editar';
        dispatch(startGettingUser(ownerId, ownerId === currentUserId));
        dispatch(closeChallengeModal());
        break;
      case 403:
        message = 'No puedes acceder a tus propios retos';
        dispatch(closeChallengeModal());
        break;
      case 401:
        message = 'No estás autorizado para editar retos';
        dispatch(closeChallengeModal());
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
  dispatch(finishChallengeModalLoading());
};

// eslint-disable-next-line max-len
export const startCreatingChallenge = (description, ownerId, currentUserId) => async (dispatch, getState) => {
  dispatch(startChallengeModalLoading());
  const { token } = getState().auth;
  try {
    await api.post('challenges', { userId: ownerId, description }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire('Reto creado', '', 'success');
    dispatch(startGettingUser(ownerId, ownerId === currentUserId));
    dispatch(closeChallengeModal());
  } catch (e) {
    let message;
    let detail = '';
    switch (e.response ? e.response.status : 0) {
      case 404:
        message = 'No se pudo encontrar al usuario al que le quieres crear un reto';
        dispatch(closeChallengeModal());
        break;
      case 403:
        message = 'No puedes acceder a tus propios retos';
        dispatch(closeChallengeModal());
        break;
      case 401:
        message = 'No estás autorizado para crear retos';
        dispatch(closeChallengeModal());
        break;
      case 400:
        message = 'Los datos ingresados no son válidos';
        detail = 'Las descripciones deben ser de por lo menos 5 caracteres';
        break;
      default:
        message = 'Ha ocurrido un error, por favor vuelve a intentarlo';
        break;
    }
    Swal.fire(message, detail, 'error');
  }
  dispatch(finishChallengeModalLoading());
};

// eslint-disable-next-line max-len
export const startDeletingChallenge = (challengeId, ownerId, currentUserId) => async (dispatch, getState) => {
  dispatch(startChallengeModalLoading());
  const { token } = getState().auth;
  try {
    await api.delete(`challenges/${challengeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire('Reto eliminado', '', 'success');
    dispatch(startGettingUser(ownerId, ownerId === currentUserId));
    dispatch(closeChallengeModal());
  } catch (e) {
    let message;
    switch (e.response ? e.response.status : 0) {
      case 404:
        message = 'No se pudo encontrar al reto que quieres eliminar';
        dispatch(startGettingUser(ownerId, ownerId === currentUserId));
        dispatch(closeChallengeModal());
        break;
      case 403:
        message = 'No puedes acceder a tus propios retos';
        dispatch(closeChallengeModal());
        break;
      case 401:
        message = 'No estás autorizado para eliminar retos';
        dispatch(closeChallengeModal());
        break;
      case 400:
        message = 'El reto seleccionado no es válido';
        break;
      default:
        message = 'Ha ocurrido un error, por favor vuelve a intentarlo';
        break;
    }
    Swal.fire(message, '', 'error');
  }
  dispatch(finishChallengeModalLoading());
};
