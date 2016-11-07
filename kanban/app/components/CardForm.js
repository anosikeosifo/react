import React, { Component, PropTypes } from 'react';

class Cardform extends Component {
  handleChange(field, e) {
    this.props.handleChange(field, e.trarget.value);
    e.preventDefault();
  }

  handleClose(e) {
    this.props.handleClose();
    e.preventDefault();
  }

  buildFormUI() {
    return (
      <form onSubmit={ this.props.handleSubmit.bind(this) }>
        <input type='text'
          value={ this.props.draftCard.title }
          onChange={ this.handleChange.bind(this, 'title') }
          placeholder='Title'
          required={ true }
          autoFocus={ true } />

        <textarea value={ this.props.draftCard.description }
          onChange={ this.handleChange.bind(this, 'description') }
          placeholder='Description'
          required={ true }>
        </textarea>

        <label htmlFor='status'>Status</label>
        <select id='status' value={ this.props.draftCard.status } onChange={ this.handleChange.bind(this, 'status') }>
          <option value='todo'>To Do</option>
          <option value='in-progress'>In Progress</option>
          <option value='done'>Done</option>
        </select>

        <label htmlFor='color'>Color</label>
        <input id='color'
          type='color'
          value={ this.props.draftCard.color }
          onChange={ this.handleChange.bind(this, 'color') }/>

        <div className='actions'>
          <button type='submit'>{ this.props.buttonLabel }</button>
        </div>
      </form>
    );
  }

  render() {
    return(
      <div>
        <div className='card big'>
          { this.buildFormUI() }
        </div>
        <div className='overlay' onClick={ this.handleClose.bind(this) }></div>
      </div>
    );
  }
}


Cardform.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  draftCard: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,

  handleChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}


export default Cardform;
