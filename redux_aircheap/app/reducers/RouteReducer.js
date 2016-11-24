import constants from '../constants';
import update from 'react-addons-update';

class RouteReducer {
  constructor() {
    this.initialState = {
      origin: '',
      destination: '',
    }
  }

  route(state = { origin: '',  destination: '', }, action) {
    switch (action.type) {
      case constants.CHOOSE_AIRPORT:
        return update(state, {
          [action.target]: { $set: action.code }// update the chosen airport.. either origin or destination
        });

      default:
        return state;
    }
  }
}

export default new RouteReducer();
