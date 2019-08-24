import React, { Component } from 'react'

import '../css/Task.css';
import edit from '../img/edit.svg';
import trash from '../img/trash.svg';

class Task extends Component {

  handleClick = (e) => {
    if(e.target.type === 'checkbox'){
      this.props.handleCheck(e.target.id)
    }
  }

  render() {
    return (
      <div className="Task">
        <input type="checkbox" id={this.props.id} onChange={this.handleClick} checked={this.props.completed} />
        <label htmlFor={this.props.id}>{this.props.title}</label>
        <div>
          <img src={edit} id={this.props.id} alt="Edit Task" />
          <img src={trash} id={this.props.id} alt="Delete Task" />
        </div>
      </div>
    )
  }
}

export default Task