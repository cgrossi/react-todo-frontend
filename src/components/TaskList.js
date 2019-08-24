import React, { Component } from 'react'
import uuid from 'uuid';

import '../css/TaskList.css';
import Task from './Task';

class TaskList extends Component {
  state = {
    tasks: [
      { id: uuid(), title: 'Get a haircut', completed: false },
      { id: uuid(), title: 'Get a job', completed: false },
      { id: uuid(), title: 'Learn React', completed: true },
      { id: uuid(), title: 'Mow the lawn', completed: false },
      { id: uuid(), title: 'Practice web dev', completed: false },
      { id: uuid(), title: 'Work on resume', completed: true },
    ]
  }

  handleCheck = (id) => {
    let newState = this.state.tasks.map(task => {
      if(task.id === id) {
        task.completed = !task.completed
        return task
      }
      return task
    })
    this.setState({newState})
  }

  taskDelete = (id) => {
    let newState = this.state.tasks.filter(task => task.id !== id)
    this.setState({ tasks: newState })
  }

  render() {
    const tasks = this.state.tasks.map(task => <Task 
      key={task.id} 
      id={task.id}
      title={task.title}
      taskDelete={this.taskDelete}
      handleCheck={this.handleCheck} 
      completed={task.completed} />)

    return (
      <div className="TaskList">
        {tasks}
        <div className="button-container">
          <button>Add New Task</button>
          <button>Filter Completed</button>
          <button>Sort Completed</button>
        </div>
      </div>
    )
  }
}

export default TaskList