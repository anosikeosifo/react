import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BankBalanceStore from './BankBalanceStore';
import BankActions from './BankActions';
import { Container } from 'flux/utils';

class App extends Component {
  constructor() {
    super(...arguments);
    BankActions.createAccount();
  }

  // componentDidMount() {
  //   this.storeSubscription = BankBalanceStore.addEventListener((data) => this.handleStoreChange(data));
  // }
  //
  // componentWillUnmount() {
  //   this.storeSubscription.remove();
  // }

  // handleStoreChange() {
  //   this.setState({ balance: BankBalanceStore.getState() })
  // }
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

        <div className='atm'>
          <input type='text' placeholder='Enter Amount' ref='amount'/>
          <br/>

          <button onClick={ this.withdraw.bind(this) }>Withdraw</button>
          <button onClick={ this.deposit.bind(this) }>Deposit</button>
        </div>
      </div>
    );
  }
}

App.getStores = () => ([BankBalanceStore]);
App.calculateState = (prevState) => ({ balance: BankBalanceStore.getState() })

const AppContainer = Container.create(App);

ReactDOM.render(<AppContainer/>, document.getElementById('root'));
