import AircheapAPI from '../api/AircheapAPI';
import constants from  '../constants';

export default class AirportActionCreators {
  static fetchAirports(origin, destination) {
      return (dispatch) => {
      dispatch({ type: constants.REQUEST_AIRPORTS });
      AircheapAPI.fetchAirports().then(
        (airports) => dispatch({ type: constants.RECEIVE_AIRPORTS, success: true, airports }),
        (error) => dispatch({ type: constants.RECEIVE_AIRPORTS, success: false })
      );
    };
  }

  static chooseAirport(target, airport) {
    console.log('inside chooseAirport:  airportValue: ', airport )
    return {
      type: constants.CHOOSE_AIRPORT,
      target: target,
      code: airport ? airport.value : ''
    }
  }

  static fetchTickets(origin, destination) {
    return (dispatch) => {
      dispatch({ type: constants.REQUEST_TICKETS });
      AircheapAPI.fetchTickets(origin, destination).then(
        (tickets) => dispatch({ type: constants.RECEIVE_TICKETS, success: true, tickets }),
        (error) => dispatch({ type: constants.RECEIVE_TICKETS, success: false })
      );
    };
  }
}
