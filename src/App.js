import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Header from './components/layout/Header';
import Home from './components/pages/Home';
import MapSearch from './components/pages/MapSearch';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/mapSearch">
              <MapSearch />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
