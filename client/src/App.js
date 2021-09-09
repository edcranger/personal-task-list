import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/";

//styles
import { GlobalStyles } from "./GlobalStyles";
import {
  PageLayout,
  PageContent,
} from "./components/PageLayout/PageLayoutElements";

//context
import TaskState from "./context/tasks/TaskState";

const App = () => {
  return (
    <TaskState>
      <Router>
        <PageLayout>
          <Navbar />
          <PageContent>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="*" component={PageNotFound}></Route>
            </Switch>
          </PageContent>
          <Footer />
          <GlobalStyles />
        </PageLayout>
      </Router>
    </TaskState>
  );
};

export default App;
