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

  addTask = async () => {
    let newTasks = this.state.tasks.map(task => task)
    let response = await db.post('/tasks/', {
      text: 'New Task',
      completed: false
    })
    
    newTasks.push({ 
      id: response.data.id, 
      title: response.data.text, 
      completed: response.data.completed, 
      created: response.data.created})

    this.setState({ tasks: newTasks})
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
          title: task.text,
          completed: task.completed,
          created: task.created
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
      taskEdit={this.taskEdit} />)
    } else {
      tasks = this.state.tasks.map(task => <Task 
        key={task.id} 
        id={task.id}
        title={task.title}
        taskDelete={this.taskDelete}
        handleCheck={this.handleCheck} 
        completed={task.completed}
        taskEdit={this.taskEdit} />)
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