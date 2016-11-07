import constants from '../constants';
import AppDispatcher from '../AppDispatcher';
import { ReduceStore } from 'flux/utils';

class TicketStore extends ReduceStore {
  getInitialState() {

  }

  reduce(state, action) {
    switch (action.type) {
      case constants.FETCH_TICKETS:
        return [];
      case constants.FETCH_TICKETS_SUCCESS:
        return action.payload.response;
      case constants.FETCH_TICKETS_ERROR:
        return action.payload.response;;
      default:
        return state;
    }
  }
}

export default new TicketStore(AppDispatcher);
