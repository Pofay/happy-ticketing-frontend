import React from 'react';
import logo from './logo.svg';
import './App.css';
import Project from './components/Project';
import dummyTasks from './example-tasks.json';

function App() {
  return (
    <div className="App">
      <Project title={"ProjectM"} tasks={dummyTasks.tasks} />
    </div>
  );
}

export default App;
