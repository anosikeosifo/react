import { createStore, applyMiddleware } from 'redux';
import bankReducer from './BankReducer';
import logger from './logger';
import thunk from 'redux-thunk';

const bankStore = createStore(
  bankReducer,
  applyMiddleware(thunk, logger)
);

export default bankStore;
