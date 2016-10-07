import KanbanBoard from './KanbanBoard';
import React, { Component } from 'react';
import update from 'react-addons-update';
import 'whatwg-fetch';

export default class KanbanBoardContainer extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      cards: []
    };

    this.apiData = {
      url: 'http://kanbanapi.pro-react.com',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'anosikecodeosifo@gmail.com'
      }
    };
  }

  addTask(cardId, taskName) {
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    let newTask = { id: Date.now(), name: taskName, done: false };
    let prevState = this.state;

    let updatedState = update(this.state.cards, {
      [cardIndex]: {
        tasks: { $push: [newTask] }
      }
    });

    this.setState({ cards: updatedState });

    fetch(`${ this.apiData.url }/cards/${ cardId }/tasks`, {
      method: 'post',
      headers: this.apiData.headers,
      body: JSON.stringify(newTask)
    })
    .then((response) => {
      if(response.ok) {
        return response.json;
      } else {
        throw new Error('Serer response wAsn;t ok');
      }
    })
    .then((response) => {

      //set the actual value of the task'si
      newTask.id = response.id;
      this.setState({ cards: updatedState });
    })
    .catch((error) => {
      console.log('Fetch error: ', error);
      this.setState(prevState);
    });
  }

  deleteTask(cardId, taskId, taskIndex) {
    let cardIndex = this.state.cards.findIndex((card) => cardId == card.id);
    let prevState = this.state;

    //update the list of cards to exempt the current card at cartdIndex
    let updateCards = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          $splice: [[taskIndex, 1]]
        }
      }
    });

    this.setState({ cards: updateCards });

    fetch(`${ this.apiData.url }/cards/${ cardId }/tasks/${ taskId }`, {
      method: 'delete',
      headers: this.apiData.headers
    })
    .then((response) => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error('Server response wasnt ok');
      }
    })
    .catch((error) => {
      console.log('Fetch error: ', error);
      this.setState(prevState);
    });
  }

  toggleTask(cardId, taskId, taskIndex) {
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    let newDoneValue;

    let updatedState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          [taskIndex]: {
            done: {
              $apply: (done) => {
                newDoneValue = !done;
                return newDoneValue;
              }
            }
          }
        }
      }
    });

    this.setState({ cards: updatedState });

    fetch(`${ this.apiData.url }/cards/${ cardId }/tasks/${ taskId }`, {
      method: 'put',
      headers: this.apiData.headers,
      body: JSON.stringify({ done: newDoneValue })
    })
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Server response wasnt ok');
      }
    })
    .catch((error) => {
      console.log('Fetch error: ', error);
      this.setState(prevState);
    });
  }

  componentDidMount() {
    fetch( `${ this.apiData.url }/cards`, {
      headers: this.apiData.headers
    })
    .then((responseData) => responseData.json())
    .then((response) => {
      this.setState({ cards: response })
    })
    .catch((error) => {
      console.log('An error occurred while fetching data: ', error);
    });
  }

  render() {
    return (
      <KanbanBoard cards={ this.state.cards } taskCallBacks={{ add: this.addTask.bind(this), delete: this.deleteTask.bind(this), toggle: this.toggleTask.bind(this) }} />
    );
  }
}
