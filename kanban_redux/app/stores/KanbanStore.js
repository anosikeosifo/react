import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/RootReducer'
import thunk from 'redux-thunk';

const kanbanStore  = createStore(
  rootReducer,
  applyMiddleware(thunk),
)

export default kanbanStore;
