import React, { Component } from 'react'
import axios from 'axios';

import '../css/TaskList.css';
import Task from './Task';

class TaskList extends Component {
  state = {
    tasks: []
  }

  handleCheck = (id) => {
    let newState = this.state.tasks.map(task => {
      if(task.id === +id) {
        task.completed = !task.completed
        return task
      }
      return task
    })
    this.setState({tasks: newState})
  }

  taskDelete = (id) => {
    let newState = this.state.tasks.filter(task => task.id !== +id)
    this.setState({ tasks: newState })
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://todo-api-6543.herokuapp.com/api/tasks',
    }).then(response => {
      let newState = response.data.map(task => {
        return {
          id: task.id,
          title: task.text,
          completed: task.completed,
          created: task.created
        }
      })
      this.setState({tasks: newState})
    }).catch(e => console.log(e))
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