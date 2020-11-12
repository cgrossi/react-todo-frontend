import React, { Component } from 'react'
import db from '../apis/db';

import '../css/TaskList.css';
import Task from './Task';
import Loading from './Loading';

class TaskList extends Component {
  state = {
    tasks: [],
    loading: false,
    isFiltered: false,
    filteredTasks: []
  }

  handleCheck = async (id, checked) => {
    let response = await db.put(`/tasks/${id}/`, {
      completed: checked
    })
    
    let newState = this.state.tasks.map(task => {
      if(task.id === id) {
        task.completed = response.data.completed
      }
      return task
    })
    this.setState({tasks: newState})
  }

  addTask = async () => {
    let newTasks = this.state.tasks.map(task => task)
    let response = await db.post('/tasks/', {
      title: 'New Task',
      completed: false
    })
    
    newTasks.push({ 
      id: response.data.id, 
      title: response.data.title, 
      completed: response.data.completed, 
      date: response.data.date})

    this.setState({ tasks: newTasks})
  }

  taskDelete = async (id) => {
    await db.delete(`/tasks/${id}/`)
    let newState = this.state.tasks.filter(task => task.id !== +id)
    this.setState({ tasks: newState })
  }

  taskSave = async (id, text, cb) => {
    const response = await db.put(`/tasks/${id}/`, {
        title: text
      }
    )
    const updatedTask = response.data

    let newState = this.state.tasks.map(task => {
      if(task.id === id) {
        task.title = updatedTask.title
        task.completed = updatedTask.completed
      }
      return task
    })

    cb()
    this.setState({ tasks: newState })
  }

  filterCompleted = () => {
    this.setState({ isFiltered: !this.state.isFiltered })
    let filtered = [...this.state.tasks].filter(task => !task.completed)
    this.setState({filteredTasks: filtered})
  }

  sortTasks = () => {
    let sorted = [...this.state.tasks].sort((a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1)
    this.setState({tasks: sorted})
  }

  componentDidMount() {
    this.setState({ loading: true })
    db.get('/tasks').then(response => {
      let newState = response.data.map(task => {
        return {
          id: task.id,
          title: task.title,
          completed: task.completed,
          date: task.date
        }
      })
      this.setState({ 
        tasks: newState,
        loading: false
      })
    }).catch(e => console.log(e))
  }
  

  render() {
    let tasks;
    if(this.state.isFiltered) {
      tasks = this.state.filteredTasks.map(task => <Task 
      key={task.id} 
      id={task.id}
      title={task.title}
      taskDelete={this.taskDelete}
      handleCheck={this.handleCheck} 
      completed={task.completed}
      taskSave={this.taskSave}
       />)
    } else {
      tasks = this.state.tasks.map(task => <Task 
        key={task.id} 
        id={task.id}
        title={task.title}
        taskDelete={this.taskDelete}
        handleCheck={this.handleCheck} 
        completed={task.completed}
        taskSave={this.taskSave} />)
    }

    return (
      <div className="TaskList">
        {this.state.loading ? <Loading /> : tasks}
        <div className="button-container">
          <button onClick={this.addTask}>Add New Task</button>
          <button onClick={this.filterCompleted}>Filter Completed</button>
          <button onClick={this.sortTasks}>Sort Completed</button>
        </div>
      </div>
    )
  }
}

export default TaskList