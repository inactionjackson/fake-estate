import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { StoreProvider, createStore } from "easy-peasy";
import "./App.css";

import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import MapSearch from "./components/pages/MapSearch";
import model from "./SearchModel";

const store = createStore(model);

export default function App() {
  return (
    <StoreProvider store={store}>
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
    </StoreProvider>
  );
}
