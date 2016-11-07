import constants from '../constants';
import AppDispatcher from '../AppDispatcher';
import KanbanAPI from '../api/KanbanAPI';
import { throttle } from '../utils/CommonUtils';

export default class CardActionCreators {
  static fetchCards() {
    AppDispatcher.dispatchAsync(KanbanAPI.fetchCards(), {
      request: constants.FETCH_CARDS,
      success: constants.FETCH_CARDS_SUCCESS,
      failure: constants.FETCH_CARDS_ERROR,
    });
  }

  static addCard(card) {
    AppDispatcher.dispatchAsync(KanbanAPI.createCard(card), {
      request: constants.CREATE_CARD,
      success: constants.CREATE_CARD_SUCCESS,
      failure: constants.CREATE_CARD_ERROR,
    }, { card });
  }

  static updateCard(card, draftCard) {
    AppDispatcher.dispatchAsync(KanbanAPI.updateCard(card, draftCard), {
      request: constants.UPDATE_CARD,
      success: constants.UPDATE_CARD_SUCCESS,
      failure: constants.UPDATE_CARD_ERROR,
    }, { card, draftCard });
  }

  static updateCardStatus(cardId, listId) {
    throttle((cardId, listId) => {
      AppDispatcher.dispatch({
        type: constants.UPDATE_CARD_STATUS,
        payload: { cardId, listId },
      });
    });
  }

  static updateCardPosition(cardId, afterId) {
    throttle((cardId, afterId) => {
      AppDispatcher.dispatch({
        type: constants.UPDATE_CARD_POSITION,
        payload: { cardId, afterId },
      });
    });
  }

  static persistCardDrag(cardProps) {
    let card = CardStore.getCard(cardProps.id);
    let cardIndex = CardStore.getCardIndex(cardProps.id);

    AppDispatcher.dispatchAsync(KanbanAPI.persistCardDrag(card.id, card.status, cardIndex), {
      request: constants.PERSIST_CARD_DRAG,
      success: constants.PERSIST_CARD_DRAG_SUCCESS,
      failure: constants.PERSIST_CARD_DRAG_ERROR,
    }, { cardProps });
  }

  static toggleCardDetails(cardId) {
    AppDispatcher.dispatch({
      type: constants.TOGGLE_CARD_DETAILS,
      payload: { cardId }
    })
  }

  static createDraft(card) {
    AppDispatcher.dispatch({
      type: constants.CREATE_DRAFT,
      payload: { card}
    })
  }

  static updateDraft(field, value) {
    AppDispatcher.dispatch({
      action: constants.UPDATE_DRAFT,
      payload: { field, value }
    })
  }
}
