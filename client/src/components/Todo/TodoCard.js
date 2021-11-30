import React from "react";
import { useHistory } from "react-router-dom";

//styles
import { TodoCard } from "./TodoElements";

const Todo = ({ todo, setShowModal, setCurrentTodo }) => {
  const history = useHistory();
  const handleClick = () => {
    // setShowModal(true);
    // setCurrentTodo(todo);

    history.push(`/todo/${todo._id}`);
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
