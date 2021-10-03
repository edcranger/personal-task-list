import React from "react";
import { useHistory } from "react-router-dom";

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

const TaskItems = ({ task, handler }) => {
  const history = useHistory();

  const { taskTitle, description, status } = task;

  const handleNav = () => {
    history.push(`/task/${task._id}`);
  };

  return (
    <TaskItemWrapper>
      <TaskItemHeader>
        <MdModeEdit
          className="headerBtn"
          onClick={() => handler({ type: "update", task })}
        />
        <BsTrash2Fill
          className="headerBtn"
          onClick={() => handler({ type: "delete", task })}
        />
      </TaskItemHeader>
      <TaskItemContent onClick={handleNav}>
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
