import React, { useContext, useState } from "react";
import TaskContext from "../../context/tasks/taskContext";

import TaskItem from "./TaskItems";
import { TasksWrapper, AddTask, AddBtn } from "./TasksElements";

//components
import Modal from "../Modal";
import TaskForm from "./TaskForm";

const Tasks = () => {
  const taskContext = useContext(TaskContext);

  const [showModal, setShowModal] = useState(false);

  const { tasks, filtered } = taskContext;

  const handleClick = () => setShowModal(true);

  if (tasks.length === 0) {
    return <h1>Please Add Task</h1>;
  }

  return (
    <TasksWrapper>
      {filtered !== null
        ? filtered.map((task) => (
            <TaskItem key={task._id} task={task} setShowModal={setShowModal} />
          ))
        : tasks.map((task) => (
            <TaskItem key={task._id} task={task} setShowModal={setShowModal} />
          ))}
      <AddTask>
        <AddBtn onClick={handleClick} />
      </AddTask>

      <Modal
        opacity="0.8"
        showModal={showModal}
        setShowModal={setShowModal}
        title="Add task"
      >
        <TaskForm />
      </Modal>
    </TasksWrapper>
  );
};

export default Tasks;
