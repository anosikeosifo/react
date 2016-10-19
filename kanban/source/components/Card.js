import React, { Component, PropTypes } from 'react';
import CheckList from './CheckList';
import marked from 'marked';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { DragSource, DropTarget } from 'react-dnd';
import Constants from '../lib/constants';
import { Link } from 'react-router';

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
    props.cardCallbacks.persistDrag(props.id, props.status);
  }
};

const cardDropSpec = {
  hover(props, monitor) {
    const draggedCardId = monitor.getItem().id;
    props.cardCallbacks.updatePosition(draggedCardId, props.id);
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
  constructor() {
    super();
    this.state = {
      showDetails: false
    };

    this.sideColors = { "in-progress": "#ffa600", "done": "green", "todo": "blue" };
  }

  setCardStyle(status){
    return { borderLeft: `4px solid ${ this.sideColors[status] }` };
  }

  toggleCardDetails() {
    this.setState({ showDetails: !this.state.showDetails });
  }

  render() {
    let cardDetails;
    let { connectDragSource, connectDropTarget } = this.props;

    if (this.state.showDetails) {
      cardDetails = (
        <div className="card__details">
          <div className="class__title">{ this.props.title }</div>
          <div className="class__description" dangerouslySetInnerHTML={{ __html:marked(this.props.description) }}/>
          <CheckList cardId={ this.props.id } tasks={ this.props.tasks } taskCallbacks={ this.props.taskCallbacks }/>
        </div>
      );
    }

    //wrap the component in the higher-order component: connectDragSource
    return connectDropTarget(connectDragSource(
      <section className="card" style={ this.setCardStyle(this.props.status) }>
        <div className='card__edit'><Link to={ '/edit/' + this.props.id }>&#9998;</Link></div>
        <div className={ `card__title ${ this.state.showDetails ? 'card__open' : '' }` } onClick={ () => this.toggleCardDetails() }>{ this.props.title }</div>
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
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
}


const dragHighOrderCard = DragSource(Constants.CARD, cardDragSpec, collectDrag)(Card);
const dropHighOrderCard = DropTarget(Constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);

export default dropHighOrderCard;
