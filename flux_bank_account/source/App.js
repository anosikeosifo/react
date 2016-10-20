import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BankBalanceStore from './BankBalanceStore';
import BankRewardStore from './BankRewardStore';
import BankActions from './BankActions';
import { Container } from 'flux/utils';

class App extends Component {
  constructor() {
    super(...arguments);
    BankActions.createAccount();
  }

  withdraw() {
    BankActions.withdrawFromAccount(Number(this.refs.amount.value));
    // this.refs.amount = '';
  }

  deposit() {
    BankActions.depositIntoAccount(Number(this.refs.amount.value));
    // this.refs.amount = '';
  }

  render() {
    return(
      <div>
        <header>FluxTrust Bank</header>
        <h1>Your account balance is ${ this.state.balance.toFixed(2) }</h1>
        <h3>Your reward level is { this.state.rewardLevel }</h3>

        <div className='atm'>
          <input type='text' placeholder='Enter Amount' ref='amount'/>
          <br/>

          <button onClick={ this.withdraw.bind(this) }> Withdraw</button>
          <button onClick={ this.deposit.bind(this) }>Deposit</button>
        </div>
      </div>
    );
  }
}

App.getStores = () => ([BankBalanceStore, BankRewardStore]);
App.calculateState = (prevState) => ({
  balance: BankBalanceStore.getState(),
  rewardLevel: BankRewardStore.getState(),
});

const AppContainer = Container.create(App);

ReactDOM.render(<AppContainer/>, document.getElementById('root'));
