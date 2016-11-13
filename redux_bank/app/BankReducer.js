import constants from './constants';
import { combineReducers } from 'redux';
import update from 'react-addons-update';

const initialState = {
  intialData:{ balance: 0 },
  initialUI: { showExchange: true },
}

const balanceReducer = (state = initialState.intialData, action) => {
  switch (action.type) {
    case constants.WITHDREW_FROM_ACCOUNT:
      return { balance: state.balance - parseFloat(action.payload) };

    case constants.DEPOSITED_INTO_ACCOUNT:
      return { balance: state.balance + parseFloat(action.payload) };

    default:
      return state;
  }
};

const uiReducer = (state = initialState.initialUI, action) => {
  switch (action.type) {
    case constants.TOGGLE_EXCHANGE:
      return update(state, { showExchange: { $apply: currentState => !currentState }})
    default:
      return state;
  }
}

const bankReducer = combineReducers({ data: balanceReducer, ui: uiReducer });
export default bankReducer;
