import KanbanBoard from './KanbanBoard';
import React, { Component } from 'react';
import update from 'react-addons-update';
import { Container } from 'flux/utils';
import CardActionCreators from '../actions/CardActionCreators';
import CardStore from '../stores/CardStore';
import TaskStore from '../stores/TaskStore';

class KanbanBoardContainer extends Component {
  componentDidMount() {
    CardActionCreators.fetchCards();
  }

  render() {
    console.log('this.props.children: ', this.props.children);
    //
    // var board = React.Children.map(this.props.children, (child) => {
    //   return React.cloneElement(child, {
    //     cards: this.state.cards,
    //   })
    // });

    var board = React.cloneElement(this.props.children, {
      cards: this.state.cards,
    });
    console.log('board: ', board);

    return board;
  }
}

KanbanBoardContainer.getStores = () => ([CardStore]);

KanbanBoardContainer.calculateState = (prevState) => ({
  cards: CardStore.getState(),
});

export default Container.create(KanbanBoardContainer);
