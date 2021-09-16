import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

//components
import Navbar from "./components/Navbar";

//styles
import { GlobalStyles } from "./GlobalStyles";
import {
  PageLayout,
  PageMainContent,
} from "./components/PageLayout/PageLayoutElements";

//context
import TaskState from "./context/tasks/TaskState";

const App = () => {
  return (
    <TaskState>
      <Router>
        <PageLayout>
          <Navbar />
          <PageMainContent>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="*" component={PageNotFound}></Route>
            </Switch>
          </PageMainContent>
        </PageLayout>
      </Router>
      <GlobalStyles />
    </TaskState>
  );
};

export default App;
