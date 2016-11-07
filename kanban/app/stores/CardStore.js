import constants from '../constants';
import AppDispatcher from '../AppDispatcher';
import { ReduceStore } from 'flux/utils';
import update from 'react-addons-update';

class CardStore extends ReduceStore {
  getInitialState() {
    return [];
  }

  getCard(id) {
    return this.state.find((card) => card.id == id)
  }

  getCardIndex(cardId) {
    return this.state.findIndex((card) => card.id == cardId);
  }

  reduce(state, action) {
    let cardIndex, taskIndex;

    switch (action.type) {
      case constants.FETCH_CARDS_SUCCESS:
        return action.payload.response;

      case constants.FETCH_CARDS_ERROR:
        return action.payload.error.message;

      case constants.CREATE_CARD:
        return update(this.getState(), { $push: [action.payload.card] });

      case constants.CREATE_CARD_SUCCESS:
        cardIndex = this.getCardIndex(action.payload.card.id);
        return update(this.getState(), {
          [cardIndex]: {
            id: { $set: action.patyload.card.id }
          }
        });
      case constants.CREATE_CARD_ERROR:
        cardIndex = this.getCardIndex(action.payload.card.id);
        return update(this.getState(), { $splice: [[cardIndex]] });

      case constants.UPDATE_CARD:
        cardIndex = this.getCardIndex(action.payload.card.id);
        return update(this.getState(), {
          [cardIndex]: { $set: action.payload.draftCard }
        });

      case constants.UPDATE_CARD_ERROR:
        cardIndex = this.getCardIndex(action.payload.card.id);
        return update(this.getState(), {
          [cardIndex]: { $set: action.payload.card }
        });

      case constants.UPDATE_CARD_STATUS:
        cardIndex = this.getCardIndex(action.payload.cardId);
        return update(this.getState(), {
          [cardIndex]: {
            status: { $set: action.payload.listId }
          }
        });

      case constants.UPDATE_CARD_POSITION:
        if (action.payload.cardId != action.payload.afterId) {
          let afterIndex = this.getCardIndex(action.payload.afterId);
          cardIndex = this.getCardIndex(action.payload.cardId);
          card = this.getCard(action.payload.cardId);

          return update(this.getState(), {
            $splice: [
              [cardIndex, 1],
              [afterIndex, 0, card]
            ]
          });
        }

      case constants.PERSIST_CARD_DRAG_ERROR:
        cardIndex = this.getCardIndex(action.payload.cardProps.id);
        return update(this.getState(), {
          [cardIndex]: {
            status: { $set: action.payload.cardProps.status }
          }
        });

      case constants.TOGGLE_CARD_DETAILS:
        cardIndex = this.getCardIndex(action.payload.cardId);
        return update(this.getState(), {
          [cardIndex]: {
            showDetails:  { $apply: (currentValue) => (currentValue !== false) ? false : true }
          }
        })

      default:
        return state;
    }
  }
}

export default new CardStore(AppDispatcher);
