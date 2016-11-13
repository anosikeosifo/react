import constants from '../constants';

export default class BankActionCreators {
  static depositIntoAccount(amount) {
    return({
      type: constants.DEPOSITED_INTO_ACCOUNT,
      payload: amount,
    });
  }

  static withdrawFromAccount(amount) {
    return ({
      type: constants.WITHDREW_FROM_ACCOUNT,
      payload: amount,
    });
  }

  static toggleExchange() {
    return {
      type: constants.TOGGLE_EXCHANGE,
    }
  }
}
