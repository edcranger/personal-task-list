import React from "react";

//import styles
import { TodoContentWrapper, TodoStatus, TodoContents } from "./TodoElements";

import { Button } from "../PageLayout/UtilStyles";

const TodoContent = ({ todo, handleDelete, setShowModal }) => {
  const deleteFxn = () => {
    handleDelete(todo._id);
    setShowModal(false);
  };

  return (
    <TodoContentWrapper>
      <div className="contentTitle">
        <h1>{todo.title}</h1>
        <TodoStatus status={todo.status}>{todo.status}</TodoStatus>
      </div>

      <TodoContents>{todo.content}</TodoContents>

      <div>
        <div>Date created: {todo.date}</div>
        <Button
          background="var(--lightGrey)"
          hoverFontColor="white"
          hoverColor="var(--danger)"
          border="none"
          rounded="10px"
          onClick={deleteFxn}
        >
          Delete
        </Button>
      </div>
    </TodoContentWrapper>
  );
};

export default TodoContent;
