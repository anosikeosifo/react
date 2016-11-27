import React, { Component, PropTypes } from 'react';
import CardForm from './CardForm';
import CardActionCreators from '../actions/CardActionCreators';
import { Container } from 'flux/utils';

class NewCard extends Component {

  componentWillMount() {
    this.setState({
      id: Date.now(),
      title: '',
      description: '',
      status: 'todo',
      color: '#c9c9c9',
      tasks: []
    })
  }

  handleChange(field, value) {
    CardActionCreators.updateDraft(field, value);
  }

  handleSubmit(e) {
    CardActionCreators.addCard(this.state.draft);

    this.props.history.pushState(null, '/');
    e.preventDefault();
  }

  handleClose(e) {
    this.props.history.pushState(null, '/');
  }

  componentDidMount() {
    setTimeout(() => CardActionCreators.creatDraft(), 10);
  }

  render() {
    return (
      <CardForm draftCard={ this.state.draft }
                buttonLabel='Create Card'
                handleChange={ this.handleChange.bind(this) }
                handleSubmit={ this.handleSubmit.bind(this) }
                handleClose={ this.handleClose.bind(this) } />
    );
  }
}

NewCard.getStores = () => ([DraftStore]);
NewCard.calculateState = (prevState) => ({
  draft: DraftStore.getState()
})

export default Container.create(NewCard);
