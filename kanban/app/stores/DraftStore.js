import constants from '../constants';
import AppDispatcher from '../AppDispatcher';
import { ReduceStore } from 'flux/utils';
import update from 'react-addons-update';

let defaultDraft = () => {
  return({
    id: Date.now,
    title: '',
    description: '',
    status: 'todo',
    color: '#c9c9c9',
    tasks: [],
  });
}

class DraftStore extends ReduceStore {
  getInitialState() {
    return {};
  }

  reduce(state, action) {
    switch (action.type) {
      case constants.CREATE_DRAFT:
        if(action.payload.card) {
          return (this.getState(), {
            $set: action.payload.card
          });
        }
        break;

      case constants.UPDATE_DRAFT:
        return (this.getState(), {
          [action.payload.field]: { $set: action.payload.value }
        });
        break;
      default:
        return defaultDraft();
    }
  }
}
