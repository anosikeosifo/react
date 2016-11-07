import 'whatwg-fetch';
import 'babel-polyfill';
import constants from '../constants';
import 'whatwg-fetch';
import 'babel-polyfill';

export default class KanbanAPI {
  static fetchCards() {
    return fetch(`${ constants.API_URL }/cards`, {
      headers: constants.API_HEADERS
    })
    .then((responseData) => responseData.json());
  }

  static createCard(card) {
    return fetch(`${ constants.API_URL }/cards`, {
      headers: constants.API_HEADERS,
      method: 'post',
      body: JSON.stringify(card),
    })
    .then((responseData) => responseData.json());
  }

  static updateCard(card, draftCard) {
    return fetch(`${ constants.API_URL }/cards/${ card.id }`, {
      headers: constants.API_HEADERS,
      method: 'post',
      body: JSON.stringify(draftCard),
    })
    .then((responseData) => responseData.json());
  }

  static persistCardDrag(cardId, cardStatus, cardIndex) {
    return fetch(`${ constants.API_URL }/cards/${ cardId }`, {
      headers: constants.API_HEADERS,
      method: 'post',
      body: JSON.stringify({ status: cardStatus, row_order_position: cardIndex }),
    })
    .then((responseData) => responseData.json());
  }

  static createTask(cardId, task) {
    return fetch(`${ constants.API_URL }/cards/${ cardId }/tasks`, {
      headers: constants.API_HEADERS,
      method: 'post',
      body: JSON.stringify(task),
    })
    .then((responseData) => responseData.json());
  }

  static toggleTask(cardId, task) {
    return fetch(`${ constants.API_URL }/cards/${ cardId }/tasks/${ task.id }`, {
      headers: constants.API_HEADERS,
      method: 'put',
      body: JSON.stringify({ done: !task.done }),
    })
    .then((responseData) => responseData.json());
  }

  static deleteTask(cardId, task) {
    return fetch(`${ constants.API_URL }/cards/${ cardId }/tasks/${ task.id }`, {
      headers: constants.API_HEADERS,
      method: 'delete',
    })
  }
}
