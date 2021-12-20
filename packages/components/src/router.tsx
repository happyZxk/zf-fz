import React from "react";
import { Router, Route, Switch } from "dva/router";
import Home from "./view/home";
import About from "./view/about";

const RouterConfig = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
      </Switch>
    </Router>
  );
};

export default RouterConfig;
