import constants from '../constants';
import AppDispatcher from '../AppDispatcher';
import { MapStore } from 'flux/utils';

class RouteStore extends MapStore<String, String> {
  reduce(state, action) {
    switch (action.type) {
      case constants.CHOOSE_AIRPORT:
        return state.set(action.target, action.code);
      default:
        return state;
    }
  }
}

export default new RouteStore(AppDispatcher);
