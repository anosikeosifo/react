import 'whatwg-fetch';

export default class AircheapAPI {
  static fetchAirports(){
    return fetch('https://aircheapapi.pro-react.com/airports')
      .then((response) => response.json());
  }

  static fetchTickets(origin, destination) {
    return fetch(`https://aircheapapi.pro-react.com/tickets?origin=${origin}&destination=${destination}`)
      .then((response) => response.json());
  }
}
