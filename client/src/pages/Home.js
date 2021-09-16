import React from "react";

//styles
import {
  HomeWrapper,
  SideContent,
  MainContent,
} from "../components/PageLayout/PageLayoutElements";

//components
import Tasks from "../components/Task/Tasks";
import Avatar from "../components/Avatar";
import Collapse from "../components/Collapse";
import TaskFilter from "../components/Task/TaskFilter";

const Home = () => {
  return (
    <HomeWrapper>
      <SideContent>
        <Avatar />
        <Collapse />
      </SideContent>
      <MainContent>
        <TaskFilter />
        <Tasks />
      </MainContent>
    </HomeWrapper>
  );
};

export default Home;
