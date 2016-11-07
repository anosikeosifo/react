import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import AirCheapAPI from '../api/AirCheapAPI';

class AirportActionCreators {
  static fetchAirports(origin, destination) {
    AppDispatcher.dispatchAsync(AirCheapAPI.fetchAirports(), {
      request: constants.FETCH_AIRPORTS,
      success: constants.FETCH_AIRPORTS_SUCCESS,
      failure: constants.FETCH_AIRPORTS_ERROR,
    });
  }

  // static fetchAirportsSuccess(response) {
  //   AppDispatcher.dispatch({
  //     type: constants.FETCH_TICKETS_SUCCESS,
  //     payload: { response },
  //   });
  // }
  //
  // static fetchAirportsError(error) {
  //   AppDispatcher.dispatch({
  //     type: constants.FETCH_AIRPORTS_ERROR,
  //     payload: { error },
  //   })
  // }

  static chooseAirport(target, code) {
    AppDispatcher.dispatch({
      type: constants.CHOOSE_AIRPORT,
      target,
      code,
    });
  }
}

export default AirportActionCreators;
