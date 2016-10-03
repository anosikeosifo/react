import React, { Component } from 'react';

export default class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "Search"
    }
  }

  handleSearchInput(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <input type="text" value={ this.state.searchTerm } onChange={ this.handleSearchInput.bind(this) }/>
    );
  }
}
