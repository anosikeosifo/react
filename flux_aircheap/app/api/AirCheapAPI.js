import 'whatwg-fetch';
import AirportActionCreators from '../actions/AirportActionCreators';


class AirCheapAPI {
  static fetchAirports() {
    return fetch('airports.json')
    .then((response) => response.json())

  }

  static fetchTickets() {
    return fetch('tickets.json')
    .then((response) => response.json())
  }
}

export default AirCheapAPI;
