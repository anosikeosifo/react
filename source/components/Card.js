import React, { Component, PropTypes } from 'react';
import CheckList from './CheckList';
import marked from 'marked';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

let titlePropType = (props, propName, componentName) => {
  if (props[propName]) {
    let value = props[propName];
    if(typeof value !== 'string' || value.length > 80) {
      return new Error(`${ propName } in ${ componentName } is longer than 80 characters`);
    }
  }
}

export default class Card extends Component {
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

    if (this.state.showDetails) {
      cardDetails = (
        <div className="card__details">
          <div className="class__title">{ this.props.title }</div>
          <div className="class__description" dangerouslySetInnerHTML={{ __html:marked(this.props.description) }}/>
          <CheckList cardId={ this.props.id } tasks={ this.props.tasks } taskCallBacks={ this.props.taskCallBacks }/>
        </div>
      );
    }

    return (
      <section className="card" style={ this.setCardStyle(this.props.status) }>
        <div className={ `card__title ${ this.state.showDetails ? 'card__open' : '' }` } onClick={ () => this.toggleCardDetails() }>{ this.props.title }</div>
        <ReactCSSTransitionGroup transitionName="togglecard" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          { cardDetails }
        </ReactCSSTransitionGroup>
      </section>
    );
  }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  task: PropTypes.arrayOf(PropTypes.object),
  taskCallBacks: PropTypes.object,
}
