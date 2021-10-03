import React, { useContext, useState } from "react";
import TaskContext from "../../context/tasks/taskContext";

import TaskItem from "./TaskItems";
import { TasksWrapper, AddTask, AddBtn } from "./TasksElements";

//components
import Modal from "../Modal";
import TaskForm from "./TaskForm";
import { Button } from "../PageLayout/UtilStyles";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [deletingTask, setDeletingTask] = useState(false);
  const [currTask, setCurrTask] = useState(null);

  const taskContext = useContext(TaskContext);
  const { tasks, filtered, deleteTask, userEditing } = taskContext;

  const handleClick = () => setShowModal(true);

  const handler = ({ type, task }) => {
    if (type === "update") {
      setDeletingTask(false);
      userEditing(true);
    } else {
      setDeletingTask(true);
      userEditing(false);
    }
    setCurrTask(task);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteTask(currTask._id);
    setCurrTask(null);
    setDeletingTask(false);
    setShowModal(false);
  };

  return (
    <TasksWrapper>
      {tasks.length === 0 && (
        <div>
          <h1>Please Add Task</h1>
        </div>
      )}

      {filtered !== null
        ? filtered.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              handler={handler}
              setShowModal={setShowModal}
            />
          ))
        : tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              handler={handler}
              setShowModal={setShowModal}
            />
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
        {deletingTask ? (
          <div>
            <h3>Are you sure you want to delete this Task?</h3>
            <Button
              border="none"
              hoverColor="var(--danger)"
              onClick={confirmDelete}
            >
              Yes
            </Button>

            <Button
              border="none"
              hoverColor="var(--warning)"
              onClick={() => setShowModal(false)}
            >
              No
            </Button>
          </div>
        ) : (
          <TaskForm setShowModal={setShowModal} currTask={currTask} />
        )}
      </Modal>
    </TasksWrapper>
  );
};

export default Tasks;
