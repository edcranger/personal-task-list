import React from "react";

//import styles
import {
  TodoContentWrapper,
  TodoStatus,
  TodoContents,
  Button,
} from "./TodoElements";

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
        <Button type="danger" onClick={deleteFxn}>
          Delete
        </Button>
      </div>
    </TodoContentWrapper>
  );
};

export default TodoContent;
