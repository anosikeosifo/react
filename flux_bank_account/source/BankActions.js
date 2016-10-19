import AppDispatcher from './AppDispatcher';
import bankConstants from './constants';

class BankActions {
   createAccount() {
     AppDispatcher.dispatch({
       type: bankConstants.CREATED_ACCOUNT,
       amount: 0
     })
   }

   withdrawFromAccount(amount) {
     AppDispatcher.dispatch({
      type: bankConstants.WITHDREW_FROM_ACCOUNT,
      amount: amount
     });
   }

   depositIntoAccount(amount) {
     AppDispatcher.dispatch({
       type: bankConstants.DEPOSITED_INTO_ACCOUNT,
       amount: amount
     });
   }
}

export default new BankActions();
