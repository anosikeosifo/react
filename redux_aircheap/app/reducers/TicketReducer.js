import constants from '../constants';

class TicketReducer {
  tickets(state = [], action) {
    switch (action.type) {
      case constants.REQUEST_TICKETS:
        return [];
      case constants.RECEIVE_TICKETS:
        return action.tickets
      default:
        return state;
    }
  }
}

export default new TicketReducer();
