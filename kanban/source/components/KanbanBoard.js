import React, { Component, PropTypes } from 'react';
import List from './List';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Link } from 'react-router';

class KanbanBoard extends Component {
  getCardsForStatus(status) {
    return this.props.cards.filter((card) => {
      return card.status === status.toLowerCase();
    });
  }

  render() {
    let cardModal;

    if (this.props.children) {
      cardModal = React.cloneElement(this.props.children, {
        cards: this.props.cards,
        cardCallbacks: this.props.cardCallbacks
      });
    }

    return (
      <section className="app">
        <Link to='/new' className='float-button'>+</Link>
        <List id="todo" title="Todo" cards={ this.getCardsForStatus('todo') } taskCallbacks={ this.props.taskCallbacks } cardCallbacks={ this.props.cardCallbacks }/>
        <List id="in-progress" title="In Progress" cards={ this.getCardsForStatus('in-progress') } taskCallbacks={ this.props.taskCallbacks } cardCallbacks={ this.props.cardCallbacks } />
        <List id="done" title="Done" cards={ this.getCardsForStatus('done') } taskCallbacks={ this.props.taskCallbacks } cardCallbacks={ this.props.cardCallbacks } />
        { cardModal }
      </section>
    )
  }
}


KanbanBoard.propTypes = {
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  cards: PropTypes.arrayOf(PropTypes.object),
}


export default DragDropContext(HTML5Backend)(KanbanBoard);
