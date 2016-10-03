import React, { Component, PropTypes } from 'react';
import Card from  './Card';
import marked from 'marked';

export default class List extends Component {

  buildCardsForList() {
    return this.props.cards.map((card) => {
      return <Card id={ card.id } key={ card.id } {...card} taskCallBacks={ this.props.taskCallBacks }/>
    });
  }

  render() {
    let cards = this.buildCardsForList();
    return (
      <section className="list">
        <h1>{ this.props.title }</h1>
        { cards }
      </section>
    )
  }
}


List.propTypes = {
  cards: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  taskCallBacks: PropTypes.object,
}

List.defaultProps = {
  card: {},
}
