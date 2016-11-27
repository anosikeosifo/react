import constants from '../constants';

class CardReducer {
  cards(state = [], action) {
    let cardIndex, taskIndex;

    switch (action.type) {
      case constants.RECEIVE_CARDS:
        return action.success ? action.cards : action.error
      case constants.CREATE_CARD:
        return update(this.getState(), { $push: [action.payload.card] });

      case constants.CREATE_CARD_SUCCESS:
        handleCreateCardSuccess(state, action);
      case constants.CREATE_CARD_ERROR:
        cardIndex = this.getCardIndex(action.payload.card.id);
        return update(this.getState(), { $splice: [[cardIndex]] });

      case constants.UPDATE_CARD:
        this.updateCardDetails(state, action);
      case constants.UPDATE_CARD_ERROR:
        this.handleUpdateError(state, action);

      case constants.UPDATE_CARD_STATUS:
        this.updateCardStatus(state, action);

      case constants.UPDATE_CARD_POSITION:
        this.updateCardPosition(state, action)

      case constants.PERSIST_CARD_DRAG_ERROR:
        this.persistCardDrag(state, action);

      case constants.TOGGLE_CARD_DETAILS:
        this.toggleCardDetails(state, action);
      default:
        return state;
    }
  }

  getCard(id) {
    return this.state.find((card) => card.id == id)
  }

  getCardIndex(cardId) {
    return this.state.findIndex((card) => card.id == cardId);
  }

  updateCardPosition(action, state) {
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
  }

  persistCardDrag(state, action) {
    cardIndex = this.getCardIndex(action.payload.cardProps.id);
    return update(this.getState(), {
      [cardIndex]: {
        status: { $set: action.payload.cardProps.status }
      }
    });
  }

  toggleCardDetails(state, action) {
    cardIndex = this.getCardIndex(action.payload.cardId);
    return update(this.getState(), {
      [cardIndex]: {
        showDetails:  { $apply: (currentValue) => (currentValue !== false) ? false : true }
      }
    });
  }

  updateCardStatus(state, action) {
    cardIndex = this.getCardIndex(action.payload.cardId);
    return update(this.getState(), {
      [cardIndex]: {
        status: { $set: action.payload.listId }
      }
    });
  }

  updateCardDetails(state, action) {
    cardIndex = this.getCardIndex(action.payload.card.id);
    return update(this.getState(), {
      [cardIndex]: { $set: action.payload.draftCard }
    });
  }

  handleUpdateError(state, action) {
    cardIndex = this.getCardIndex(action.payload.card.id);
    return update(this.getState(), {
      [cardIndex]: { $set: action.payload.card }
    });
  }

  handleCreateCardSuccess(state, action) {
    cardIndex = this.getCardIndex(action.payload.card.id);
    return update(this.getState(), {
      [cardIndex]: {
        id: { $set: action.patyload.card.id }
      }
    });
  }
}

export default new CardReducer();
