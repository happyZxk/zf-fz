import React from "react";
import { HashRouter as Router, Route, Switch } from "dva/router";
import BaseLayout from "./layout/base-layout";
import Home from "@/view/home";
import About from "@/view/about";

const RouterConfig = ({ history }) => {
  return (
    <BaseLayout>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
        </Switch>
      </Router>
    </BaseLayout>
  );
};

export default RouterConfig;
