import { combineReducers } from 'redux';
import CardReducer from './CardReducer';

const rootReducer = combineReducers({
  cards: CardReducer.cards,
});

export default rootReducer;
