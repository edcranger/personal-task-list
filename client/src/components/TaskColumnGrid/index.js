import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

//styles
import { Wrapper, GridContent } from "./TaskColumnGrid";

//context
import TaskColumnContext from "../../context/taskColumn/taskColumnContext";

const TaskColumnGrid = () => {
  const { taskId } = useParams();
  const [columns, setColumns] = useState(null);

  const { isLoading, currentTaskColumns, getAllColumns } =
    useContext(TaskColumnContext);

  useEffect(() => {
    getAllColumns(taskId);
    return () => {};
  }, [taskId]);

  if (!currentTaskColumns) return <h1>Loading....</h1>;
  return (
    <Wrapper>
      {currentTaskColumns.map((col) => (
        <GridContent key={col._id}>
          <h3>{col.columnName}</h3>
        </GridContent>
      ))}
    </Wrapper>
  );
};

export default TaskColumnGrid;
