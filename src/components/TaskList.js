import React, { Component } from 'react'

import '../css/TaskList.css';
import Task from './Task';

class TaskList extends Component {
  render() {
    return (
      <div className="TaskList">
        <Task />
      </div>
    )
  }
}

export default TaskList