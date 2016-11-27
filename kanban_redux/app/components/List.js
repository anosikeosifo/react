import React, { Component, PropTypes } from 'react';
import Card from  './Card';
import marked from 'marked';
import { DropTarget } from 'react-dnd';
import constants from '../constants';
import CardActionCreators from '../actions/CardActionCreators';

let listTargetSpec = {
  hover(props, monitor) {
    const draggedCardId = monitor.getItem().id;
    CardActionCreators.updateStatus(draggedCardId, props.id);
  }
};

const collectDrop = (connect, monitor) => {
  return({
    connectDropTarget: connect.dropTarget(),
  });
}

class List extends Component {
  buildCardsForList() {
    return this.props.cards.map((card) => {
      <Card key={ card.id } {...card} />;
    });
  }

  render() {
    let { connectDropTarget } = this.props;
    let cards = this.buildCardsForList();
    console.log('this.cards: ', cards);


    return connectDropTarget(
      <section className="list">
        <h1>{ this.props.title }</h1>
        { cards }
      </section>
    );
  }
}

List.propTypes = {
  id: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
}

export default DropTarget(constants.LIST, listTargetSpec, collectDrop)(List);
