import constants from '../constants';
import AppDispatcher from '../AppDispatcher';
import { ReduceStore } from 'flux/utils';

class AirportStore extends ReduceStore {
  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch (action.type) {
      case constants.FETCH_TICKETS_SUCCESS:
        return action.payload.response;
      default:
        return state;
    }
  }
}

//the Flux store types take a dispatcher object as constructor parameter
export default new AirportStore(AppDispatcher);
