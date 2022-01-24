import { types } from '../types/types';

const initState = {
  loginLoading: false,
  registerLoading: false,
  usersLoading: {
    loading: false,
    error: '',
  },
  userLoading: {
    loading: false,
    error: '',
  },
  challengeModalLoading: false,
  challengeModalOpen: false,
  gamesLoading: {
    loading: false,
    error: '',
  },
  newGameLoading: false,
  gameLoading: {
    loading: false,
    error: '',
  },
  gameAdminLoading: false,
  gameModalLoading: false,
  gameModalOpen: false,
  gameModalMode: '',
};

// eslint-disable-next-line default-param-last
export const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case types.startLoginLoading:
      return {
        ...state,
        loginLoading: true,
      };

    case types.finishLoginLoading:
      return {
        ...state,
        loginLoading: false,
      };

    case types.startRegisterLoading:
      return {
        ...state,
        registerLoading: true,
      };

    case types.finishRegisterLoading:
      return {
        ...state,
        registerLoading: false,
      };

    case types.startUsersLoading:
      return {
        ...state,
        usersLoading: {
          loading: true,
          error: '',
        },
      };

    case types.finishUsersLoading:
      return {
        ...state,
        usersLoading: {
          loading: false,
          error: action.payload,
        },
      };

    case types.startUserLoading:
      return {
        ...state,
        userLoading: {
          loading: true,
          error: '',
        },
      };

    case types.finishUserLoading:
      return {
        ...state,
        userLoading: {
          loading: false,
          error: action.payload,
        },
      };

    case types.startChallengeModalLoading:
      return {
        ...state,
        challengeModalLoading: true,
      };

    case types.finishChallengeModalLoading:
      return {
        ...state,
        challengeModalLoading: false,
      };

    case types.openChallengeModal:
      return {
        ...state,
        challengeModalOpen: true,
      };

    case types.closeChallengeModal:
      return {
        ...state,
        challengeModalOpen: false,
      };

    case types.startGamesLoading:
      return {
        ...state,
        gamesLoading: {
          loading: true,
          error: '',
        },
      };

    case types.finishGamesLoading:
      return {
        ...state,
        gamesLoading: {
          loading: false,
          error: action.payload,
        },
      };

    case types.startNewGameLoading:
      return {
        ...state,
        newGameLoading: true,
      };

    case types.finishNewGameLoading:
      return {
        ...state,
        newGameLoading: false,
      };

    case types.startGameLoading:
      return {
        ...state,
        gameLoading: {
          loading: true,
          error: '',
        },
      };

    case types.finishGameLoading:
      return {
        ...state,
        gameLoading: {
          loading: false,
          error: action.payload,
        },
      };

    case types.startGameAdminLoading:
      return {
        ...state,
        gameAdminLoading: true,
      };

    case types.finishGameAdminLoading:
      return {
        ...state,
        gameAdminLoading: false,
      };

    case types.startGameModalLoading:
      return {
        ...state,
        gameModalLoading: true,
      };

    case types.finishGameModalLoading:
      return {
        ...state,
        gameModalLoading: false,
      };

    case types.openGameModal:
      return {
        ...state,
        gameModalOpen: true,
        gameModalMode: action.payload,
      };

    case types.closeGameModal:
      return {
        ...state,
        gameModalOpen: false,
        gameModalMode: '',
      };

    default:
      return state;
  }
};
