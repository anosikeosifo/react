import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

export default class GroceryItem extends Component {
  render() {
    return (
      <li>{ this.props.quantity } x { this.props.name }</li>
    );
  }
}
