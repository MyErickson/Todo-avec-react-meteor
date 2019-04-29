import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks.js';
import classnames from 'classnames';
 
// Task component - represents a single todo item
 class Task extends Component {
  toggleChecked=() =>{
     // Définit la propriété cochée à l'opposé de sa valeur actuelle
     Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }
 
  deleteThisTask =()=> {
     Meteor.call('tasks.remove', this.props.task._id);
  }

  togglePrivate =()=> {
    Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
  }

  render() {
     // Donne un nom de classe différent aux tâches lorsqu'elles sont cochées,
    // afin que nous puissions les nommer joliment en CSS
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
    });
    return (
    <li className={taskClassName}>
      <button className="delete" onClick={this.deleteThisTask}>
        &times;
      </button>
        
      <input
        type="checkbox"
        readOnly
        checked={!!this.props.task.checked}
        onClick={this.toggleChecked}
      />
      { this.props.showPrivateButton ? (
        <button className="toggle-private" onClick={this.togglePrivate}>
          { this.props.task.private ? 'Private' : 'Public' }
        </button>
      ) : ''}
    <span className = "text" >
          <strong> { this .props.task.username} </strong>: {this.props.task.text}
        </span>
      </li>
    );
  }
}

export default Task