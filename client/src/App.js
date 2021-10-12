import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";

//Containers
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Task from "./pages/Task";
import Signup from "./containers/Signup";
import Login from "./containers/Login";

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
import TodoState from "./context/todos/TodoState";
import AuthState from "./context/auth/AuthState";

const App = () => {
  return (
    <AuthState>
      <TaskState>
        <TaskColumnState>
          <TodoState>
            <Router>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <PageLayout>
                  <Navbar />
                  <PageMainContent>
                    <Route path="/">
                      <Switch>
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute path="/task/:taskId" component={Task} />
                        <PrivateRoute path="*" component={PageNotFound} />
                      </Switch>
                    </Route>
                  </PageMainContent>
                </PageLayout>
              </Switch>
            </Router>
            <GlobalStyles />
          </TodoState>
        </TaskColumnState>
      </TaskState>
    </AuthState>
  );
};

export default App;
