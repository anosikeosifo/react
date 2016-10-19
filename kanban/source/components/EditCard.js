import React, { Component, PropTypes } from 'react';
import CardForm from  './CardForm';

class EditCard extends Component {
  componentWillMount() {
    let card = this.props.cards.find((card) => card.id == this.props.params.card_id);
    this.setState({card});
  }

  handleSubmit(e) {
    this.props.cardCallbacks.updateCard(this.state);
    this.props.history.pushState(null, '/');
    e.preventDefault();
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  handleClose(e) {
    this.props.history.pushState(null, '/');
  }

  render() {
    return (
      <CardForm draftCard={ this.state }
      buttonLabel='EditCard'
      handleChange={ this.handleChange.bind(this) }
      handleSubmit={ this.handleSubmit.bind(this) }
      handleClose={ this.handleClose.bind(this) } />
    )
  }
}

EditCard.propTypes = {
  cardCallbacks: PropTypes.object,
}

export default EditCard;
