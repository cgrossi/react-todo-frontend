import React from 'react';

import '../css/App.css';
import TaskList from './TaskList';

const App = () => {
  return (
    <div className="App">
      <h1 className="heading">Task Manager</h1>
      <TaskList />
    </div>
  )
}

export default App