import React, { useContext } from "react";
import TaskContext from "../../context/tasks/taskContext";

const TaskItem = () => {
  const taskContext = useContext(TaskContext);

  const { tasks } = taskContext;

  return (
    <>
      {tasks.map((task) => (
        <h1 key={task._id}>{task.taskTitle}</h1>
      ))}
    </>
  );
};

export default TaskItem;
