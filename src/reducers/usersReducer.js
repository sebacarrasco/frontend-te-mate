import { types } from '../types/types';

const initState = {
  users: [],
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    createdAt: '',
    kills: 0,
  },
  selectedUsers: [],
};

// eslint-disable-next-line default-param-last
export const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case types.setUsers:
      return {
        ...state,
        users: [...action.payload],
      };

    case types.setUser:
      return {
        ...state,
        user: action.payload,
      };

    case types.setSelectedUsers:
      return {
        ...state,
        selectedUsers: [...action.payload],
      };

    default:
      return state;
  }
};
