import React, { Component, PropTypes } from 'react';
import Card from  './Card';
import marked from 'marked';
import { DropTarget } from 'react-dnd';
import Constants from '../lib/constants';

let listTargetSpec = {
  hover(props, monitor) {
    const draggedCardId = monitor.getItem().id;
    props.cardCallbacks.updateStatus(draggedCardId, props.id);
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
      return <Card key={ card.id } taskCallbacks={ this.props.taskCallbacks } cardCallbacks={ this.props.cardCallbacks } {...card} />
    });
  }

  render() {
    let cards = this.buildCardsForList();
    let { connectDropTarget } = this.props;

    return connectDropTarget(
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
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  connectDropTarget: PropTypes.func.isRequired,
}

List.defaultProps = {
  card: {},
}


export default DropTarget(Constants.LIST, listTargetSpec, collectDrop)(List);
