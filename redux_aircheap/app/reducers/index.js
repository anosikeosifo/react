import { combineReducers } from 'redux';
import airportReducer from './AirportReducer';
import routeReducer from './RouteReducer';
import ticketReducer from './TicketReducer';

const rootReducer = combineReducers({
  airports: airportReducer.airports,
  route: routeReducer.route,
  tickets: ticketReducer.tickets,
});

export default rootReducer;
