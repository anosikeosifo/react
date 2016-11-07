import React, { Component, PropTypes } from 'react';
import CardForm from  './CardForm';
import CardActionCreators from '../actions/CardActionCreators';
import CardStore from '../stores/CardStore';
import DraftStore from '../stores/DraftStore';
import { Container } from 'flux/utils';

class EditCard extends Component {
  handleSubmit(e) {
    CardActionCreators.updateCard(CardStore.getCard(parseInt(this.props.params.card_id)), this.state.draft);
    this.props.history.pushState(null, '/');
    e.preventDefault();
  }

  handleChange(field, value) {
    CardActionCreators.updateDraft(field, value);
  }

  handleClose(e) {
    this.props.history.pushState(null, '/');
  }

  componentDidMount() {
    setTimeout(() => {
      CardActionCreators.createDraft(CardStore.getCard(this.props.params.card_id), 10);
    });
  }

  render() {
    return (
      <CardForm draftCard={ this.state.draft }
      buttonLabel='EditCard'
      handleChange={ this.handleChange.bind(this) }
      handleSubmit={ this.handleSubmit.bind(this) }
      handleClose={ this.handleClose.bind(this) } />
    )
  }
}

EditCard.getStores = () => ([DraftStore]);
EditCard.calculateState = (previousState) => ({
  draft: DraftStore.getState()
});

export default Container.create(EditCard);
