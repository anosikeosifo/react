import KanbanBoard from './KanbanBoard';
import React, { Component } from 'react';
import update from 'react-addons-update';
import CardActionCreators from '../actions/CardActionCreators';
import { Provider, connect } from 'react-redux';

const mapStateToProps = (state) => ({
  cards: state.cards
});

const mapDispatchToProps = (dispatch) => ({
  fetchCards: () => dispatch(CardActionCreators.fetchCards()),
});

class KanbanBoardContainer extends Component {
  componentDidMount() {
    this.props.fetchCards();
  }

  render() {

    // var board = React.Children.map(this.props.children, (child) => {
    //   return React.cloneElement(child, {
    //     cards: this.props.cards,
    //   })
    // });

    let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
     cards: this.props.cards,
   });

    console.log('board: ', kanbanBoard);
    return kanbanBoard;
  }
}

const KanbanAppContainer = connect(mapStateToProps, mapDispatchToProps)(KanbanBoardContainer);

export default KanbanAppContainer
