import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import AirCheapAPI from '../api/AirCheapAPI';

class TicketActionCreator {
  static fetchTickets() {
    AppDispatcher.dispatchAsync(AirCheapAPI.fetchTickets(), {
      request: constants.FETCH_TICKETS,
      success: constants.FETCH_TICKETS_SUCCESS,
      failure: constants.FETCH_TICKETS_ERROR,
    });
  }

  // static fetchTicketsSuccess(repsonse) {
  //   AppDispatcher.dispatch({
  //     type: constants.FETCH_TICKETS_SUCCESS,
  //     payload: { response },
  //   });
  // }

  // static fetchTicketsError() {
  //   AppDispatcher.dispatch({
  //     type: constants.FETCH_TICKETS_ERROR,
  //     payload: { response },
  //   });
  // }
}
