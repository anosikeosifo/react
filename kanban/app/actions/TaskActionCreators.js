import constants from '../constants';
import AppDispatcher from '../AppDispatcher';
import KanbanAPI from '../api/KanbanAPI';

export default class TaskActionCreators {
  // static fetchTasks() {
  //   AppDispatcher.dispatchAsync(KanbanAPI.fetchTasks(), {
  //     request: constants.FETCH_TASKS,
  //     success: constants.FETCH_TASKS_SUCCESS,
  //     failure: constants.FETCH_TASKS_ERROR,
  //   });
  // }

  static addTask(cardId, task) {
    AppDispatcher.dispatchAsync(KanbanAPI.createTask(cardId, task), {
      request: constants.CREATE_TASK,
      success: constants.CREATE_TASK_SUCCESS,
      failure: constants.CREATE_TASK_ERROR,
    }, { cardId, task });
  }

  static deleteTask(cardId, task, taskIndex) {
    AppDispatcher.dispatchAsync(KanbanAPI.deleteTask(cardId, task, taskIndex), {
      request: constants.DELETE_TASK,
      success: constants.DELETE_TASK_SUCCESS,
      failure: constants.DELETE_TASK_ERROR,
    }, { cardId, task, taskIndex});
  }

  static toggleTask(cardId, task, taskIndex) {
    AppDispatcher.dispatchAsync(KanbanAPI.toggleTask(cardId, task, taskIndex), {
      request: constants.TOGGLE_TASK,
      success: constants.TOGGLE_TASK_SUCCESS,
      failure: constants.TOGGLE_TASK_ERROR,
    }, { cardId, task, taskIndex });
  }
}
