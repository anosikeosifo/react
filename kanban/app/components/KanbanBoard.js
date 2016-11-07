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
    console.log('chidren: ', this.props.children);
    console.log('props: ', this.props);
    return (
      <section className="app">
        <Link to='/new' className='float-button'>+</Link>
        <List id="todo" title="To do" cards={ this.getCardsForStatus('todo') }/>
        <List id="in-progress" title="In Progress" cards={ this.getCardsForStatus('in-progress') } />
        <List id="done" title="Done" cards={ this.getCardsForStatus('done') } />
        { this.props.children }
      </section>
    );
  }
}

KanbanBoard.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
};

export default DragDropContext(HTML5Backend)(KanbanBoard);
