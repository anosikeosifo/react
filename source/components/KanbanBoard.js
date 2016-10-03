import React, { Component, PropTypes } from 'react';
import List from './List';
import SearchForm from './SearchForm';

export default class KanbanBoard extends Component {
  getCardsForStatus(status) {
    return this.props.cards.filter((card) => {
      return card.status === status.toLowerCase();
    });
  }

  render() {
    return (
      <section className="app">
        <List id="todo" title="Todo" cards={ this.getCardsForStatus('todo') } taskCallBacks={ this.props.taskCallBacks }/>
        <List id="in-progress" title="In Progress" cards={ this.getCardsForStatus('in-progress') } taskCallBacks={ this.props.taskCallBacks }/>
        <List id="done" title="Done" cards={ this.getCardsForStatus('done') } taskCallBacks={ this.props.taskCallBacks }/>
      </section>
    )
  }
}


KanbanBoard.propTypes = {
  taskCallBacks: PropTypes.object,
  cards: PropTypes.arrayOf(PropTypes.object),
}
