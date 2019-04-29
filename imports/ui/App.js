import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { Tasks }  from '../api/tasks.js';
import Task from './Task.js';
 
// App component - represents the whole app
class App extends Component {
    state = {
      hideCompleted:false,
      input: React.createRef(),
    }
 
  renderTasks = ()=> {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
    
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;
 
      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  handleSubmit = (event)=> {
    event.preventDefault ();
    const input = this.state.input;
    // Trouver le champ de texte via la référence React
    const text = input.current.value.trim ();
 
    Meteor.call ( 'tasks.insert' , text);
 
    // Forme claire
    input.current.value = '' ;
  }

  toggleHideCompleted =()=> {
    this.setState ({
      hideCompleted: !this.state.hideCompleted,
    });
  }
  render() {
    return (
      <div className="container">
        <header>
         <h1>Todo List ({this.props.incompleteCount})</h1>
          <h1>Todo List</h1>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted}
            />
            Hide Completed Tasks
          </label>
          <AccountsUIWrapper />
          { this.props.currentUser?
            <form className = "new-task" onSubmit = { this.handleSubmit}>
              <input
                type = "text"
                ref = {this.state.input}
                placeholder = "Type pour ajouter de nouvelles tâches"
              />
            </form>: ''
          }
        </header>
 
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

export default withTracker(()=> {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);