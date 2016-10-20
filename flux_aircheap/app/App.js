import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'flux/utils';
import AirportActionCreators from '../actions/AirportActionCreators';
import AirportStore from '../stores/AirportStore';

class App extends Component {

  componentDidMount() {
    AirportActionCreators.fetchAiports();
  }

  render() {
    return(
      <div>Just content</div>
    )
  }
}

App.getStores = () => ([AirportStore]);
App.calculateState = (previousState) => ({
  airports: AirportStore.getState()
});

const AppContainer = Container.create(App);
render(<AppContainer />, document.getElementById('root'));
