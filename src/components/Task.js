import React, { Component } from 'react'

import '../css/Task.css';
import edit from '../img/edit.svg';
import trash from '../img/trash.svg';

class Task extends Component {

  render() {
    return (
      <div className="Task">
        <input type="checkbox" id="box-1"/>
        <label htmlFor="box-1">Get a haircut</label>
        <div>
          <img src={edit} alt="Edit Task" />
          <img src={trash} alt="Delete Task" />
        </div>
      </div>
    )
  }
}

export default Task