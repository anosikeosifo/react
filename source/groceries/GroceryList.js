import React, { Component } from 'react';
import GroceryItem from './GroceryItem';

export default class GroceryList extends Component {
  render() {
    return (
      <ul>
        <GroceryItem quantity='1' name="McVities Shortbread"/>
        <GroceryItem quantity='4' name="McVities Hobnobs Chocolate"/>
        <GroceryItem quantity='12' name="Remy Martin VSOP"/>
      </ul>
    );
  }
}
