import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'flux/utils';
import AirportActionCreators from './actions/AirportActionCreators';
import AirportStore from './stores/AirportStore';
import Autosuggest from 'react-autosuggest';

class App extends Component {
  componentDidMount() {
    AirportActionCreators.fetchAiports();
  }

  getSuggestions(input, callback) {
    console.log(`input: ${ input }, callback: ${ callback }`);
    const escapedInput = input.trim().toLowerCase();
    const airportMatchRegex = new Regex('\\b' + escapedInput, 'i');
    const suggestions = this.state.airports
            .filter(airport => airportMatchRegex.test(airport.city))
            .sort((aiport1, airport2) => {
              airport1.city.toLowerCase().indexOf(escapedInput) - airport2.city.toLowerCase().indexOf(escapedInput);
            })
            .slice(0, 7)
            .map(airport => `$(airport.city) - ${ airport.country } (${ airport.code })`);
    return suggestions;
  }

  onSuggestionFetchRequested() {
    
  }

  onSuggestionClearRequested() {

  }

  render() {
    return(
      <div>
        <header>
          <div className='header-brand'>
            <img src='./logo.png' height='35'/>
            <p>Check discount ticket prices and pay using your AirCheap points</p>
          </div>

          <div className='header-route'>
            <Autosuggest id="origin"
                    onSuggestionFetchRequested={ this.onSuggestionFetchRequested.bind(this) }
                    onSuggestionClearRequested={ this.onSuggestionClearRequested.bind(this) }
                    suggestions={ this.getSuggestions.bind(this) }
                    inputProps={{ placeholder: 'From' }} />

            <Autosuggest id="destination"
                    onSuggestionFetchRequested={ this.onSuggestionFetchRequested.bind(this) }
                    onSuggestionClearRequested={ this.onSuggestionClearRequested.bind(this) }
                    suggestions={ this.getSuggestions.bind(this) }
                    inputProps={{ placeholder: 'To' }} />
          </div>
        </header>
      </div>
    )
  }
}

App.getStores = () => ([AirportStore]);
App.calculateState = (previousState) => ({
  airports: AirportStore.getState()
});

const AppContainer = Container.create(App);
ReactDOM.render(<AppContainer/>, document.getElementById('root'));
