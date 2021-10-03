import React, { useEffect, useState } from "react";

//styles
import {
  TaskColumnFormWrapper,
  TaskColumnFormInput,
} from "./TaskColumnElements";

const TaskColumnForm = ({ taskColumn, updateTaskColumn }) => {
  const [taskCol, setTaskCol] = useState({
    _id: "",
    task: "",
    user: "",
    columnName: "",
    todos: [],
  });

  useEffect(() => {
    setTaskCol({ ...taskColumn });
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    /*  setTaskCol(e.target.value); */
    setTaskCol({ ...taskCol, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    updateTaskColumn(taskCol);
  };

  return (
    <TaskColumnFormWrapper onSubmit={submitHandler}>
      <TaskColumnFormInput
        type="text"
        name="columnName"
        value={taskCol.columnName}
        onChange={handleChange}
      />
    </TaskColumnFormWrapper>
  );
};

export default TaskColumnForm;
