import React from "react";

//styles
import { TaskWrapper } from "../components/PageLayout/PageLayoutElements";

//components
import TaskColumnGrid from "../components/TaskColumnGrid";

const Task = () => {
  return (
    <TaskWrapper>
      <TaskColumnGrid />
    </TaskWrapper>
  );
};

export default Task;
