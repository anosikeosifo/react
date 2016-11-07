import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'flux/utils';
import AirportActionCreators from './actions/AirportActionCreators';
import TicketActionCreators from './actions/TicketActionCreators';
import AirportStore from './stores/AirportStore';
import TicketStore from './stores/TicketStore';
import RouteStore from './stores/RouteStore';
import Autosuggest from 'react-autosuggest';
import Utils from './utils/CommonUtils';

class App extends Component {
  componentDidMount() {
    AirportActionCreators.fetchAirports();
  }

  componentWillUpdate(nextProps, nextState) {
    const originAndDestinationSelected = nextState.origin && nextState.destination;
    const selectionChangedSinceLastUpdate = (this.state.origin !== nextState.origin || this.state.destination !== nextState.destination);

    if(originAndDestinationSelected && selectionChangedSinceLastUpdate) {
      TicketActionCreators.fetchTickets(nextState.origin, nextState.destination);
    }
  }

  renderSuggestion(suggestion) {
    return (
      <div className='suggestion__item'>{ suggestion }</div>
    )
  }

  getSuggestionValue(suggestion) {
    return suggestion;
  }

  onSuggestionsFetchRequested(input) {
    const suggestions = Utils.filterAndSort(this.state.airports, input.value);
    this.setState({ suggestionResults: suggestions })
  }

  onSuggestionsClearRequested() {
    this.setState({ suggestionResults: [] })
  }

  handleSourceInputChange(event, { newValue }) {
    this.setState({ sourceFilterValue: newValue })
  }

  handleDestinationInputChange(event, { newValue }) {
    this.setState({ destinationFilterValue: newValue })
  }

  handleSelect(target, suggestion, event) {
    const airportCodeRegex = /\(([^)]+)\)/;
    let airportCode = airportCodeRegex.exec(suggestion)[1];
    AirportActionCreators.chooseAirport(target, airportCode)
  }

  render() {
    const sourceInputProps = {
      placeholder: 'From',
      onChange: this.handleSourceInputChange.bind(this),
      value: this.state.sourceFilterValue,
    };

    const destinationInputProps = {
      placeholder: 'To',
      onChange: this.handleDestinationInputChange.bind(this),
      value: this.state.destinationFilterValue,
    };

    let ticketList = this.state.tickets.map((ticket) => { <TicketItem key={ ticket.id } ticket={ ticket } /> })

    return(
      <div>
        <header>
          <div className='header-brand'>
            <img src='./logo.png' height='35'/>
            <p>Check discount ticket prices and pay using your AirCheap points</p>
          </div>

          <div className='header-route'>
            <Autosuggest id="origin"
                    onSuggestionsFetchRequested={ this.onSuggestionsFetchRequested.bind(this) }
                    onSuggestionsClearRequested={ this.onSuggestionsClearRequested.bind(this) }
                    suggestions={ this.state.suggestionResults }
                    renderSuggestion={ this.renderSuggestion }
                    getSuggestionValue={ this.getSuggestionValue }
                    onSuggestionSelected={ this.handleSelect.bind(this, 'origin') }
                    inputProps={ sourceInputProps } />

            <Autosuggest id="destination"
                    onSuggestionsFetchRequested={ this.onSuggestionsFetchRequested.bind(this) }
                    onSuggestionsClearRequested={ this.onSuggestionsClearRequested.bind(this) }
                    suggestions={ this.state.suggestionResults }
                    renderSuggestion={ this.renderSuggestion }
                    getSuggestionValue={ this.getSuggestionValue }
                    onSuggestionSelected={ this.handleSelect.bind(this, 'destination') }
                    inputProps={ destinationInputProps } />
          </div>
        </header>

        <section>
          { ticketList }
        </section>
      </div>
    )
  }
}

App.getStores = () => ([AirportStore, TicketStore, RouteStore]);
App.calculateState = (previousState) => ({
  airports: AirportStore.getState(),
  tickets: TicketStore.getState(),
  origin: RouteStore.get('origin'),
  destination: RouteStore.get('destination'),
  sourceFilterValue: '',
  destinationFilterValue: '',
  suggestionResults: [],
});

const AppContainer = Container.create(App);
ReactDOM.render(<AppContainer/>, document.getElementById('root'));
