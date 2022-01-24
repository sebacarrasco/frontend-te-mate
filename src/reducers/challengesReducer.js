import { types } from '../types/types';

const initState = {
  challenge: {
    id: '0',
    description: '',
    userId: '0',
  },
  mode: 'create', // 'create' || 'edit'
};

// eslint-disable-next-line default-param-last
export const challengesReducer = (state = initState, action) => {
  switch (action.type) {
    case types.setChallengeModal:
      return {
        ...action.payload,
      };

    case types.clearChallengeModal:
      return initState;

    default:
      return state;
  }
};
