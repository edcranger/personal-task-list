import React, { useContext } from "react";

//context
import TaskContext from "../../context/tasks/taskContext";

//icons
import { MdModeEdit } from "react-icons/md";
import { BsTrash2Fill } from "react-icons/bs";

//styles
import {
  TaskItemWrapper,
  TaskBadge,
  TaskItemHeader,
  TaskItemContent,
  TaskItemFooter,
} from "./TaskItemsElement";

const TaskItems = ({ task }) => {
  const taskContext = useContext(TaskContext);
  const { deleteTask, setCurrentTask, clearCurrentTask, userEditing } =
    taskContext;

  const { taskTitle, description, status, _id } = task;

  const handleDelete = () => {
    deleteTask(_id);
    clearCurrentTask();
  };

  const handleEdit = () => {
    setCurrentTask(task);
    userEditing(true);
  };

  return (
    <TaskItemWrapper>
      <TaskItemHeader>
        <MdModeEdit className="headerBtn" onClick={handleEdit} />
        <BsTrash2Fill className="headerBtn" onClick={handleDelete} />
      </TaskItemHeader>
      <TaskItemContent>
        <h3>{taskTitle}</h3>
        {description}
      </TaskItemContent>
      <TaskItemFooter>
        <TaskBadge>{status}</TaskBadge>
      </TaskItemFooter>
    </TaskItemWrapper>
  );
};

export default TaskItems;
