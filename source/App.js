import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GroceryList from './groceries/GroceryList';

// console.log(<GroceryList/>);
ReactDOM.render(<GroceryList/>, document.getElementById('root'))


// class Hello extends Component {
//   constructor() {
//     super();
//     this.author = "Anosike Osifo"
//   }
//   render() {
//     return (
//       <h3>Hi, {this.author}</h3>
//     );
//   }
// }
// ReactDOM.render(<Hello/>, document.getElementById('root'));
