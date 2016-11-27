import constants from '../constants';
import KanbanAPI from '../api/KanbanAPI';
import { throttle } from '../utils/CommonUtils';

export default class CardActionCreators {
  static fetchCards() {
    return (dispatch) => {
      dispatch({ type: constants.REQUEST_CARDS });
      KanbanAPI.fetchCards().then(
        (cards) => dispatch({ type: constants.RECEIVE_CARDS, success: true, payload: cards }),
        (error) => dispatch({ type: constants.RECEIVE_CARDS, success: false, error })
      )
    }
  }

  static addCard(card) {
    return (dispatch) => {
      dispatch({ type: constants.CREATE_CARD });
      KanbanAPI.createCard(card).then(
        (card) => dispatch({ type: constants.CREATE_CARD_SUCCESS, success: true, payload: card }),
        (error) => dispatch({ type: constants.CREATE_TASK_ERROR, success: false, error })
      )
    };
  }

  static updateCard(card, draftCard) {
    return (dispatch) => {
      dispatch({ type: constants.UPDATE_CARD });
      KanbanAPI.updateCard(card, draftCard).then(
        (card) => dispatch({ type: constants.UPDATE_CARD_RESULT, success: true, payload: { card, draftCard } }),
        (error) => dispatch({ type: constants.UPDATE_CARD_ERROR, success: false, error })
      );
    };
  }

  static updateCardStatus(cardId, listId) {
    throttle((cardId, listId) => {
      return {
        type: constants.UPDATE_CARD_STATUS,
        payload: { cardId, listId },
      }
    });
  }

  static updateCardPosition(cardId, afterId) {
    return {
      type: constants.UPDATE_CARD_POSITION,
      payload: { cardId, afterId },
    }
  }

  static persistCardDrag(cardProps) {
    let card = KanbanStore.getCard(cardProps.id);
    let cardIndex = KanbanStore.getCardIndex(cardProps.id);

    return (dispatch) => {
      dispatch({ type: constants.PERSIST_CARD_DRAG });
      KanbanAPI.persistCardDrag(card.id, card.status, cardIndex).then(
        (card) => dispatch({ type: constants.PERSIST_CARD_DRAG_RESULT, success: true, payload: { cardProps } }),
        (error) => dispatch({ type: constants.PERSIST_CARD_DRAG_RESULT, success: false, error })
      );
    }
  }

  static toggleCardDetails(cardId) {
    return {
      type: constants.TOGGLE_CARD_DETAILS,
      payload: { cardId }
    };
  }

  static createDraft(card) {
    return {
      type: constants.CREATE_DRAFT,
      payload: { card}
    };
  }

  static updateDraft(field, value) {
    return {
      action: constants.UPDATE_DRAFT,
      payload: { field, value }
    };
  }
}
