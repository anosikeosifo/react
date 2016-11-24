import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';
import logger from '../middlewares/logger';

const aircheapStore  = createStore(
  reducer,
  applyMiddleware(logger, thunk),
)

export default aircheapStore;
