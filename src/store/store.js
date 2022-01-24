import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { usersReducer } from '../reducers/usersReducer';
import { challengesReducer } from '../reducers/challengesReducer';
import { gamesReducer } from '../reducers/gamesReducer';

// Para redux devtools
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  users: usersReducer,
  challenges: challengesReducer,
  games: gamesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);
