import React, { Component, PropTypes } from 'react';

export default class CheckList extends Component {

  handleNewTaskInput(event) {
    if(event.key == 'Enter') {
      this.props.taskCallbacks.add(this.props.cardId, event.target.value);
      event.target.value = '';
    }

    //clear the input box's value
  }

  render() {
    let taskItems = this.props.tasks.map((task, taskIndex) => {
      return (
        <li className="checklist__task" key={ task.id }>
          <input type="checkbox" defaultChecked={ task.done } onChange={ this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)}/>
          <span>{ task.name }</span>
          <a href="#" className="checklist__task--remove" onClick={ this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex)}/>
        </li>
      );
    });

    return(
      <section className="checklist">
        <ul>{ taskItems }</ul>
        <input type="text" className="checklist--add-task" placeholder="Type and hit enter to create a task" onKeyPress={ this.handleNewTaskInput.bind(this) }/>
      </section>
    );
  }
}

CheckList.propTypes = {
  taskCallbacks: PropTypes.object,
  cardId: PropTypes.number.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
}
