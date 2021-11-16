import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";

//Containers
import Home from "./containers/Home";
import PageNotFound from "./pages/PageNotFound";
import Task from "./containers/Task";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Todo from "./containers/Todo";

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
import ContributorState from "./context/contributors/ContributorState";
import NotificationsState from "./context/notifications/NotificationsState";

const App = () => {
  let history = useHistory();
  return (
    <AuthState history={history}>
      <TaskState>
        <TaskColumnState>
          <TodoState>
            <ContributorState>
              <NotificationsState>
                <Router>
                  <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <PageLayout>
                      <Navbar />
                      <PageMainContent>
                        <Switch>
                          <PrivateRoute exact path="/" component={Home} />
                          <PrivateRoute path="/task/:taskId" component={Task} />
                          <PrivateRoute path="/todo/:todoId" component={Todo} />
                          <PrivateRoute path="*" component={PageNotFound} />
                        </Switch>
                      </PageMainContent>
                    </PageLayout>
                  </Switch>
                </Router>
              </NotificationsState>
            </ContributorState>
            <GlobalStyles />
          </TodoState>
        </TaskColumnState>
      </TaskState>
    </AuthState>
  );
};

export default App;
