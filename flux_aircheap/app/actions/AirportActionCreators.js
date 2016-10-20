import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import AirCheapAPI from '../api/AirCheapAPI';

class AirportActionCreators {
  static fetchAiports() {
    AirCheapAPI.fetchAiports();
    AppDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS,
    });
  }

  static fetchAirportsSuccess(reponseData) {
    AppDispatcher.dispatch({
      type: constants.FETCH_TICKETS_SUCCESS,
      payload: { reponseData },
    });
  }

  static fetchAirportsError() {
    AppDispatcher.dispatch({
      type: constants.FETCH_AIRPORTS_ERROR,
      payload: { error },
    })
  }
}

export default AirportActionCreators;
