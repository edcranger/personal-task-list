import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

//styles
import { Wrapper } from "./TaskColumnGrid";

//componet
import TaskColumn from "./TaskColumn";

//context
import TaskColumnContext from "../../context/taskColumn/taskColumnContext";

const TaskColumnGrid = () => {
  const { taskId } = useParams();

  const { currentTaskColumns, getAllColumns } = useContext(TaskColumnContext);

  useEffect(() => {
    getAllColumns(taskId);
    return () => {};
  }, [taskId]);

  if (!currentTaskColumns) return <h1>Loading....</h1>;
  return (
    <Wrapper>
      {currentTaskColumns.map((col) => (
        <TaskColumn key={col._id} col={col}></TaskColumn>
      ))}
    </Wrapper>
  );
};

export default TaskColumnGrid;
