import 'whatwg-fetch';
import AirportActionCreators from '../Actions/AirportActionCreators';


class AirCheapAPI {
  static fetchAiports() {
    fetch('../../static/airports.json')
      .then((response) => response.json)
      .then((responseData) => {
        AirportActionCreators.fetchAiportsSuccess(responseData);
      })
      .catch((error) => {
        AirportActionCreators.fetchAiportsError(error);
      });
  }
}

export default AirCheapAPI;
