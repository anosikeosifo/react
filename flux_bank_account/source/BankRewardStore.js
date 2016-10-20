import AppDispatcher from './AppDispatcher';
import bankConstants from './constants';
import { ReduceStore } from 'flux/utils';
import BankBalanceStore from './BankBalanceStore';

let balance = 0;

class BankRewardStore extends ReduceStore {
  getInitialState() {
    return 'basic';
  }

  reduce(state, action) {
    //use the waitFor method to implement asynchronous feature
    this.getDispatcher().waitFor([
      BankBalanceStore.getDispatchToken()
    ]);

    if (action.type === bankConstants.DEPOSITED_INTO_ACCOUNT || action.type === bankConstants.WITHDREW_FROM_ACCOUNT) {
      let balance = BankBalanceStore.getState();
      if (balance < 5000) {
        return 'Basic';
      } else if (balance < 10000) {
        return 'Silver';
      } else if ( balance < 50000 ) {
        return 'Gold';
      } else {
        return 'Platinum';
      }
    }

    return state;
  }

}

export default new BankRewardStore(AppDispatcher);
