import React, { PropTypes, Component } from 'react';
import bankStore from '../BankStore';
import ReactDOM from 'react-dom';
import BankApp from './BankApp';
import BankActionCreators from '../actions/BankActionCreators';
import { connect, Provider } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    balance: state.data.balance,
    showExchange: state.ui.showExchange
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeposit: (amount) => dispatch(BankActionCreators.depositIntoAccount(amount)),
    onWithdraw: (amount) => dispatch(BankActionCreators.withdrawFromAccount(amount)),
    onToggle: () => dispatch(BankActionCreators.toggleExchange()),
  };
}

const BankAppContainer = connect(mapStateToProps, mapDispatchToProps)(BankApp);

ReactDOM.render(
  <Provider store={ bankStore }>
    <BankAppContainer/>
  </Provider>,
  document.getElementById('root')
);
