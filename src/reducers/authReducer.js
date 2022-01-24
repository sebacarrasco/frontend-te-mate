import { types } from '../types/types';

const initState = { token: '' };

// eslint-disable-next-line default-param-last
export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case types.login:
      return {
        token: action.payload,
      };

    case types.logout:
      return initState;

    default:
      return state;
  }
};
