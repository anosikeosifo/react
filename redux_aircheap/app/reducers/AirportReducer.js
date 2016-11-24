import constants from '../constants';

class AirportReducer {
  airports(state = [], action) {
    switch (action.type) {
      case constants.RECEIVE_AIRPORTS:
        return action.airports
      default:
        return state;
    }
  }
}

export default new AirportReducer();
