import React, { Component, PropTypes } from 'react';
import TaskActionCreators from '../actions/TaskActionCreators';

export default class CheckList extends Component {
  handleNewTaskInput(event) {
    if(event.key == 'Enter') {
      let newTask = { id: Date.now(), name: event.target.value, done: false }
      TaskActionCreators.addTask(this.props.cardId, newTask);
      event.target.value = '';
    }
  }

  render() {
    let taskItems = this.props.tasks.map((task, taskIndex) => {
      return (
        <li className="checklist__task" key={ task.id }>
          <input type="checkbox" defaultChecked={ task.done } onChange={ TaskActionCreators.toggleTask.bind(null, this.props.cardId, task, taskIndex)}/>
          <span>{ task.name }</span>
          <a href="#" className="checklist__task--remove" onClick={ TaskActionCreators.deleteTasks.bind(null, this.props.cardId, task, taskIndex)}/>
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
  cardId: PropTypes.number.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
}
