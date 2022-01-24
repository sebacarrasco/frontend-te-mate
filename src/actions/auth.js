import Swal from 'sweetalert2';
import { api } from '../api/api';
import { types } from '../types/types';
import {
  finishLoginLoading,
  finishRegisterLoading,
  startLoginLoading,
  startRegisterLoading,
} from './ui';

export const login = (token) => ({
  type: types.login,
  payload: token,
});

export const startLogin = (email, password) => async (dispatch) => {
  dispatch(startLoginLoading());
  try {
    const { data } = await api.post('auth/login', { email, password });
    dispatch(login(data.access_token));
  } catch (e) {
    let message;
    switch (e.response ? e.response.status : 0) {
      case 404:
        message = 'No hay ningún usuario asociado a ese email';
        break;
      case 401:
        message = 'La clave ingresada es incorrecta';
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
  dispatch(finishLoginLoading());
};

export const logout = () => ({
  type: types.logout,
});

export const startRegister = (firstName, lastName, email, password) => async (dispatch) => {
  dispatch(startRegisterLoading());
  try {
    await api.post('auth/register', {
      firstName, lastName, email, password,
    });
    Swal.fire({
      title: 'Estamos casi!',
      text: 'Debes hacer click en el link del email que te acabamos de enviar',
      icon: 'success',
    });
  } catch (e) {
    let message;
    switch (e.response ? e.response.status : 0) {
      case 409:
        message = 'Ya existe un usuario asociado a ese email';
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
  dispatch(finishRegisterLoading());
};
