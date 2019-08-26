import React, { Component } from 'react'

import '../css/Task.css';
import save from '../img/save.svg';
import edit from '../img/edit.svg';
import trash from '../img/trash.svg';

class Task extends Component {
  state = {
    editing: false
  }

  handleClick = (e) => {
    if(e.target.type === 'checkbox'){
      this.props.handleCheck(e.target.id)
    }
  }

  handleEdit = (e) => {
    if(!this.state.editing) {
      this.setState({ editing: !this.state.editing})
    } else {
      let input = document.querySelector('.edit-input')
      console.log('target:', e.target, 'id:', e.target.id, 'input:', input, 'input value:', input.value)
      this.props.taskEdit(e.target.id, input.value)
      this.setState({ editing: !this.state.editing})
    }
    
  }

  handleDelete = (e) => {
    this.props.taskDelete(e.target.id)
  }

  updateTask = (e) => {
    
  }

  render() {
    let task;
    if(this.state.editing) {
      task = <input type="text" className={`edit-input ${this.props.id}`} />
    } else {
      task = <label htmlFor={this.props.id}>{this.props.title.length > 30 ? `${this.props.title.substring(0, 27)}...` : this.props.title}</label>
    }
    return (
      <div className="Task">
        <input type="checkbox" id={this.props.id} onChange={this.handleClick} checked={this.props.completed} />
        {task}
        <div>
          <img src={this.state.editing ? save : edit} id={this.props.id} onClick={this.handleEdit} alt="Edit Task" />
          <img src={trash} id={this.props.id} onClick={this.handleDelete} alt="Delete Task" />
        </div>
      </div>
    )
  }
}

export default Task