import { types } from '../types/types';

const initState = {
  games: [],
  game: {
    id: '',
    name: '',
    participants: [],
    status: '',
  },
  newGameId: '',
  deletedGameId: '',
};

// eslint-disable-next-line default-param-last
export const gamesReducer = (state = initState, action) => {
  switch (action.type) {
    case types.setGames:
      return {
        ...state,
        games: action.payload,
      };

    case types.setGame:
      return {
        ...state,
        game: action.payload,
      };

    case types.setNewGameId:
      return {
        ...state,
        newGameId: action.payload,
      };

    case types.setDeletedGameId:
      return {
        ...state,
        deletedGameId: action.payload,
      };

    default:
      return state;
  }
};
