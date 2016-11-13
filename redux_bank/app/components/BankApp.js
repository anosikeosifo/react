import React, { PropTypes, Component } from 'react';
import bankStore from '../BankStore';
import constants from '../constants';
import ReactDOM from 'react-dom';

export default class BankApp extends Component {
  handleDeposit() {
    this.props.onDeposit(this.refs.amount.value);
    this.refs.amount.value = '';
  }

  handleWitdhrawal() {
    this.props.onWithdraw(this.refs.amount.value);
    this.refs.amount.value = '';
  }

  render() {
    return(
      <div>
        <header>
          <img src='http://www.pro-react.com/redux-bank.svg' width='150'/>Redux Bank
        </header>
        <h1>Your balance is ${ (this.props.balance).toFixed(2) }</h1>
        <div className='atm'>
          <input type='text' placeholder='Enter amount' ref='amount'/>
          <button onClick={ this.handleDeposit.bind(this) }>Deposit</button>
          <button onClick={ this.handleWitdhrawal.bind(this) }>Withdraw</button>
        </div>

        <footer className='exchange' onClick={ this.props.onToggle }>
          <strong>Exchange rates</strong>
          <div className={ this.props.showExchange ? 'exchange--visible' : 'exchange--closed' }>
            <strong className='title'>$1 USD = </strong>
            <span className='rate'>385 NGN</span>
            <span className='rate'>0.7989 GBP</span>
          </div>
        </footer>
      </div>
    );
  }
}

BankApp.propTypes = {
  balance: PropTypes.number,
  onDeposit: PropTypes.func,
  onWithdraw: PropTypes.func,
  onTogle: PropTypes.func,
}
