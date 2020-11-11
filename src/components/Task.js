import React, { Component } from 'react'

import '../css/Task.css';
import save from '../img/save.svg';
import edit from '../img/edit.svg';
import trash from '../img/trash.svg';

class Task extends Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef();
    this.updateRef = React.createRef();
  }

  state = {
    isEditing: false
  }

  handleClick = (e) => {
    if(e.target.type === 'checkbox'){
      let label = document.querySelector(`label[for="${this.props.id}"`)
      this.props.handleCheck(e.target.id, label.innerHTML, e.target.checked)
    }
  }

  updateEdit = () => {
    this.setState({ isEditing: false })
  }

  handleEdit = () => {
    const input = this.inputRef.current
    if(!this.state.isEditing) {
      this.setState({ isEditing: true })
    } else if (this.state.isEditing) {
      this.props.taskSave(input.id, input.value, this.updateEdit)
    }
  }

  handleDelete = (e) => {
    this.props.taskDelete(e.target.id)
  }

  render() {
    let task;
    if(this.state.isEditing) {
      task = <input type="text" ref={this.inputRef} className="edit-input" id={this.props.id} />
    } else if(this.props.title) {
      task = <label htmlFor={this.props.id}>{this.props.title.length > 30 ? `${this.props.title.substring(0, 27)}...` : this.props.title}</label>
    }
    return (
      <div className="Task">
        <input type="checkbox" id={this.props.id} onChange={this.handleClick} checked={this.props.completed} />
        {task}
        <div>
          <img src={this.state.isEditing ? save : edit} ref={this.updateRef} id={this.props.id} onClick={this.handleEdit} alt="Edit Task" />
          <img src={trash} id={this.props.id} onClick={this.handleDelete} alt="Delete Task" />
        </div>
      </div>
    )
  }
}

export default Task