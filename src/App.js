import React from 'react';
import './App.css';
import Project from './pages/Project';
import dummyTasks from './example-tasks.json';

function App() {
  return (
    <div className="App">
      <Project title={"ProjectM"} tasks={dummyTasks.tasks} />
    </div>
  );
}

export default App;
