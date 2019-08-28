import React from 'react';
import './App.css';
import Project from './pages/Project';
import Index from './pages/Index';
import dummyTasks from './example-tasks.json';

// function App() {
//   return (
//     <div className="App">
//       <Project title={"ProjectM"} tasks={dummyTasks.tasks} />
//     </div>
//   );
// }

const App = () => {
  return (
    <div className="App">
      <Index />
    </div>
  );
};

export default App;
