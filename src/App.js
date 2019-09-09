import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Project from './pages/Project';
import Index from './pages/Index';
import Projects from './pages/Projects';
import PrivateRoute from './components/privateRoute';
import DialogContainer from './containers/DialogContainer';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Index} />
          <PrivateRoute exact path="/projects" component={Projects} />
          <PrivateRoute exact path="/projects/:id" component={Project} />
        </Switch>
      </BrowserRouter>
      <DialogContainer />
    </div>
  );
};

export default App;
