import React from "react";

//styles
import { TodoCard } from "./TodoElements";

const Todo = ({ todo, setShowModal, setCurrentTodo }) => {
  const handleClick = () => {
    setShowModal(true);
    setCurrentTodo(todo);
  };

  return (
    <>
      <TodoCard onClick={handleClick}>
        <h3>{todo.title}</h3>
      </TodoCard>
    </>
  );
};

export default Todo;
