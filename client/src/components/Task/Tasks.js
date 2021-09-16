import React, { useContext } from "react";
import TaskContext from "../../context/tasks/taskContext";

import TaskItem from "./TaskItems";
import { TasksWrapper, AddTask, AddBtn } from "./TasksElements";

//components
import Modal from "../Modal";
import TaskForm from "./TaskForm";

const Tasks = () => {
  const taskContext = useContext(TaskContext);

  const { tasks, openCloseModal, filtered } = taskContext;

  const handleClick = () => openCloseModal(true);

  if (tasks.length === 0) {
    return <h1>Please Add Task</h1>;
  }

  return (
    <TasksWrapper>
      {filtered !== null
        ? filtered.map((task) => <TaskItem key={task._id} task={task} />)
        : tasks.map((task) => <TaskItem key={task._id} task={task} />)}
      <AddTask>
        <AddBtn onClick={handleClick} />
      </AddTask>

      <Modal>
        <TaskForm />
      </Modal>
    </TasksWrapper>
  );
};

export default Tasks;
