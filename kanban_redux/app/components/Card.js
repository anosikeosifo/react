import React, { Component, PropTypes } from 'react';
import CheckList from './CheckList';
import marked from 'marked';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { DragSource, DropTarget } from 'react-dnd';
import Constants from '../constants';
import { Link } from 'react-router';
import CardActionCreators from '../actions/CardActionCreators';

let titlePropType = (props, propName, componentName) => {
  if (props[propName]) {
    let value = props[propName];
    if(typeof value !== 'string' || value.length > 80) {
      return new Error(`${ propName } in ${ componentName } is longer than 80 characters`);
    }
  }
}

const cardDragSpec = {
  beginDrag(props) {
    return {
      id: props.id,
      status: props.status
    };
  },

  endDrag(props, monitor) {
    CardActionCreators.persistDrag(props.id, props.status);
  }
};

const cardDropSpec = {
  hover(props, monitor) {
    const draggedCardId = monitor.getItem().id;
    CardActionCreators.updatePosition(draggedCardId, props.id);
  }
}

let collectDrag = (connect, monitor) => {
  return({
     connectDragSource: connect.dragSource()
  });
};

let collectDrop = (connect, monitor) => {
  return({
    connectDropTarget: connect.dropTarget()
  })
}

class Card extends Component {
  setCardStyle(status){
    return { borderLeft: `4px solid ${ this.sideColors[status] }` };
  }

  toggleCardDetails() {
    CardActionCreators.toggleCardDetails(this.props.id)
  }

  render() {
    let cardDetails;
    let { connectDragSource, connectDropTarget, isDragging } = this.props;
    let sideColors = { "in-progress": "#ffa600", "done": "green", "todo": "blue" };
    console.log('props: ', this.props);
    if (this.props.showDetails !== false) {
      cardDetails = (
        <div className="card__details">
          <div className="class__title">{ this.props.title }</div>
          <div className="class__description" dangerouslySetInnerHTML={{ __html:marked(this.props.description) }}/>
          <CheckList cardId={ this.props.id } tasks={ this.props.tasks } />
        </div>
      );
    }

    //wrap the component in the higher-order component: connectDragSource
    return connectDropTarget(connectDragSource(
      <section className="card" style={ this.setCardStyle(this.props.status) }>
        <div className='card__edit'><Link to={ '/edit/' + this.props.id }>&#9998;</Link></div>
        <div className={ `card__title ${ this.props.showDetails !== false ? 'card__title card__title--is-open' : 'card__title' }` } onClick={ this.toggleCardDetails.bind(this) }>{ this.props.title }</div>
        <ReactCSSTransitionGroup transitionName="togglecard" transitionEnterTimeout={100} transitionLeaveTimeout={100}>
          { cardDetails }
        </ReactCSSTransitionGroup>
      </section>
    ));
  }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  task: PropTypes.arrayOf(PropTypes.object),
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
}

const dragHighOrderCard = DragSource(Constants.CARD, cardDragSpec, collectDrag)(Card);
const dropHighOrderCard = DropTarget(Constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);

export default dropHighOrderCard;
