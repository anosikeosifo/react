import KanbanBoard from './KanbanBoard';
import React, { Component } from 'react';
import update from 'react-addons-update';
import { throttle } from '../lib/utils';
import 'whatwg-fetch';

let cardsList = [
  {
    id: 1,
    title: "Read the book",
    description: "I should read this book, its source code is available on [github](http://www.github.com/anosikeosifo)",
    status: "done",
    tasks: [],
  },

  {
    id: 2,
    title: "Write some code",
    description: "Code along with the samples in the book",
    status: "done",
    tasks: [
      {
        id: 1,
        name: "ContactList Example",
        done: true
      },
      {
        id: 2,
        name: "Kanban Example",
        done: false
      },
      {
        id: 3,
        name: "My own experiments",
        done: false
      }
    ]
  },

  {
    id: 3,
    title: "Play the piano",
    description: "I should read this piano book, its source code is available on [github](http://www.github.com/anosikeosifo)",
    status: "in-progress",
    tasks: [],
  },
]

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

    this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
    this.updateCardPosition = throttle(this.updateCardPosition.bind(this));
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

  updateCardStatus(cardId, listId) {
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    let card = this.state.cards[cardIndex];

    //execute only if the card is hovering over a different list
    if(card.status !== listId) {
      const updatedState = this.setState(update(this.state, {
        cards: {
          [cardIndex]: {
            status: { $set: listId }
          }
        }
      }));
    }
  }

  updateCardPosition(cardId, afterId) {    //execute only if hovering ovef a different card
    if(cardId !== afterId) {
      let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
      let afterIndex = this.state.cards.findIndex((card) => card.id == afterId);
      let card = this.state.cards[cardIndex];
      //using the react update addon, splice the card into the new position
      this.setState(update(this.state, {
        cards: {
          $splice: [
            [cardIndex, 1],
            [afterIndex, 0, card]
          ]
        }
      }));
      console.log(this.state.cards);
    }
  }

  persistCardDrag(cardId, status) {
    let cardIndex = this.state.cards.findIndex((card) => cardId == card.id);
    let card  = this.state.cards[cardIndex];

    fetch(`${ this.apiData.url }/cards/${ cardId }`, {
      method: 'put',
      headers: this.apiData.headers,
      body: JSON.stringify({ status: card.status, row_order_position: cardIndex })
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
      //here i roll bacvk to the previous status value
      this.setState(update(this.state, {
        cards: {
          [cardIndex]: {
            status: { $set: status }
          }
        }
      }));
    });
  }

  addCard(card) {
    let prevState = this.state;

    if (card.id === null) {
      let card = Object.assign({}, card, { id: Date.now() });
    }

    //add the new card to the array of cards
    let newState = update(this.state.cards, { $push: [card] });
    this.setState({ cards: nextState });

    fetch(`${ this.apiData.url }/cards/`, {
      method: 'post',
      headers: this.apiData.headers,
      body: JSON.stringify(card)
    })
    .then((response) => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error('Server response wasnt ok');
      }
    })
    .then((response)=> {
      card.id = response.id;// update the new card's id
      this.setState({ cards: newState });
    })
    .catch((error) => {
      console.log('Fetch error: ', error);
      this.setState(prevState);
    });
  }

  updateCard(card) {
    let cardIndex = this.state.cards.findIndex((cardArg) => card.id == cardArg.id);
    let prevState = this.state;

    //add the new card to the array of cards
    let newState = update(this.state.cards, {
      [cardIndex]: { $set: card }
    });

    this.setState({ cards: newState });

    fetch(`${ this.apiData.url }/cards/${ card.id }`, {
      method: 'put',
      headers: this.apiData.headers,
      body: JSON.stringify(card)
    })
    .then((response) => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error('Server response wasnt ok');
      }
    })
    .then((response)=> {
      this.setState({ cards: newState });
    })
    .catch((error) => {
      console.log('Fetch error: ', error);
      this.setState(prevState);
    });
  }

  componentDidMount() {
    this.setState({ cards: cardsList });
    // fetch( `${ this.apiData.url }/cards`, {
    //   headers: this.apiData.headers
    // })
    // .then((responseData) => responseData.json())
    // .then((response) => {
    //   this.setState({ cards: response })
    // })
    // .catch((error) => {
    //   console.log'An error occurred while fetching data: ', error);
    // });
  }

  render() {
    let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
      cards: this.state.cards,
      taskCallbacks: {
        add: this.addTask.bind(this),
        delete: this.deleteTask.bind(this),
        toggle: this.toggleTask.bind(this)
      },
      cardCallbacks: {
        updateStatus: this.updateCardStatus,
        updatePosition: this.updateCardPosition,
        persistDrag: this.persistCardDrag.bind(this),
        addCard: this.addCard.bind(this),
        addCard: this.updateCard.bind(this),
      }
    });

    return kanbanBoard;
  }
}
