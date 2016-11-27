import AppDispatcher from '../AppDispatcher';
import CardStore from './CardStore';
import update from 'react-addons-update';
import constants from '../constants';
import { ReduceStore } from 'flux/utils';

class TaskStore extends ReduceStore {
  getInitialState() {
    return [];
  }

  getCard(id) {
    return this.state.find((card) => card.id == id)
  }

  getCardIndex(cardId) {
    return this.state.findIndex((card) => card.id == cardId);
  }

  createTask(action, card, cardIndex) {
    cardIndex = this.getCardIndex(action.payload.cardId);
    return update(this.getState(), {
      [cardIndex]: {
        tasks: { $push: [-action.payload.task] }
      }
    });
  }

  createTaskSuccess(action, card, cardIndex) {
    cardIndex = this.getCardIndex(action.payload.cardId);
    return update(this.getState(), {
      [cardIndex]: {
        tasks: { $push: [-action.payload.task] }
      }
    });
  }

  createTaskError(action, card, cardIndex) {
    cardIndex = this.getCardIndex(action.payload.cardId);
    let taskIndex = this.getState()[cardIndex].tasks.findIndex((cardTask) => {
      return cardTask.id == task.id;
    });

    return update(this.getState(), {
      [cardIndex]: {
        tasks: {
          $splice: [[taskIndex, 1]]
        }
      }
    });
  }

  deleteTask(action, card, cardIndex) {
    cardIndex = this.getCardIndex(action.payload.cardId);
    return update(this.getState(), {
      [cardIndex]: {
        tasks: {
          $splice: [[action.payload.taskIndex, 1]]
        }
      }
    });
  }

  deleteTaskError(action, card, cardIndex) {
    cardIndex = this.getCardIndex(action.payload.cardId);
    return update(this.getState(), {
      [cardIndex]: {
        tasks: {
          $splice: [[action.payload.taskIndex, 0, action.payload.task]]
        }
      }
    });
  }

  toggleTask(action, card, cardIndex) {
    cardIndex = this.getCardIndex(action.payload.cardId);
    return update(this.getState(), {
      [cardIndex]: {
        tasks: {
          [action.payload.taskIndex]: {
            done: { $apply: (done) => !done }
          }
        }
      }
    });
  }

  toggleTaskError(action, card, cardIndex) {
    cardIndex = this.getCardIndex(action.payload.cardId);
    return update(this.getState(), {
      [cardIndex]: {
        tasks: {
          [action.payload.taskIndex]: {
            done: { $apply: (done) => !done }
          }
        }
      }
    });
  }

  reduce(state, action) {
    let card, cardIndex;

    switch (action.type) {
      case constants.CREATE_TASK:
        this.createTask(card, cardIndex, action);
        break;

      case constants.CREATE_TASK_SUCCESS:
        this.createTaskSuccess(card, cardIndex, action);
        break;

      case constants.CREATE_TASK_ERROR:
        this.createTaskError(card, cardIndex, action);
        break;

    case constants.DELETE_TASK:
      this.deleteTask(card, cardIndex, action);
      break;

    case constants.DELETE_TASK_ERROR:
      this.deleteTaskError(card, cardIndex, action);
      break;

    case constants.TOGGLE_TASK:
      this.toggleTask(card, cardIndex, action);
      break;

    case constants.TOGGLE_TASK_ERROR:
      this.toggleTaskError(card, cardIndex, action);
      break;

    default:
      return state;
    }
  }
}

export default new TaskStore(AppDispatcher);
