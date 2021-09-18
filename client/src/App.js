import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Pages
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Task from "./pages/Task";

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
import TaskColumnState from "./context/taskColumn/taskColumnState";

const App = () => {
  return (
    <TaskState>
      <TaskColumnState>
        <Router>
          <PageLayout>
            <Navbar />
            <PageMainContent>
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/task/:taskId" component={Task}></Route>
                <Route path="*" component={PageNotFound}></Route>
              </Switch>
            </PageMainContent>
          </PageLayout>
        </Router>
        <GlobalStyles />
      </TaskColumnState>
    </TaskState>
  );
};

export default App;
