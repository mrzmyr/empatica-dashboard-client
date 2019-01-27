import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router'

import Login from './pages/Login.js'
import Dashboard from './pages/Dashboard.js'

import 'normalize.css'
import './app.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Redirect from="/" to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
