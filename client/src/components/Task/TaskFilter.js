import React, { useContext, useRef, useEffect } from "react";

//styles
import { TaskFormWrapper, TaskFilterForm } from "./TaskFormElements";

//context
import TaskContext from "../../context/tasks/taskContext";

const TaskFilter = () => {
  const taskContext = useContext(TaskContext);
  const { filterTasks, clearFilterTasks, filtered } = taskContext;
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  }, [filtered]);

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterTasks(e.target.value);
    } else {
      clearFilterTasks();
    }
  };

  return (
    <TaskFormWrapper>
      <TaskFilterForm
        ref={text}
        type={text}
        placeholder="Filter Task"
        onChange={onChange}
      />
    </TaskFormWrapper>
  );
};

export default TaskFilter;
