import React, { Component } from 'react'
import db from '../apis/db';

import '../css/TaskList.css';
import Task from './Task';

class TaskList extends Component {
  state = {
    tasks: []
  }

  handleCheck = async (id, text, checked) => {
    let response = await db.patch(`/tasks/${id}/`, {
      text: text,
      completed: checked
    })
    let newState = this.state.tasks.map(task => {
      if(task.id === +id) {
        task.text = response.data.text
        task.completed = response.data.completed
        return task
      }
      return task
    })
    this.setState({tasks: newState})
  }

  taskDelete = async (id) => {
    await db.delete(`/tasks/${id}/`)
    let newState = this.state.tasks.filter(task => task.id !== +id)
    this.setState({ tasks: newState })
  }

  taskEdit = async (id, text, checked) => {
    let response = await db.patch(`/tasks/${id}/`, {
        text: text,
        completed: checked
      }
    )

    let newState = this.state.tasks.map(task => {
      if(task.id === +id) {
        task.title = response.data.text
        task.completed = response.data.completed
        return task
      }
      return task
    })

    this.setState({ tasks: newState })
  }

  componentDidMount() {
    db.get('/tasks').then(response => {
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
      completed={task.completed}
      taskEdit={this.taskEdit} />)

    return (
      <div className="TaskList">
        {tasks ? tasks : <div class="ui segment">
                          <div class="ui active inverted dimmer">
                          <div class="ui text loader">Loading</div>
                          </div>
                          <p></p>
                        </div>}
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