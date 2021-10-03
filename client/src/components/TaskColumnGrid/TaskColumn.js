import React, { useState, useContext, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

//styles
import {
  AddTodoBtn,
  AddTodoForm,
  TaskColumnWrapper,
  Button,
} from "./TaskColumnElements";

//components
import TodoCard from "../Todo/TodoCard";
import Modal from "../Modal";
import TodoContent from "../Todo/TodoContent";
import PopupMenu from "../PopupMenu";

//context
import TaskColumnContext from "../../context/taskColumn/taskColumnContext";

const TaskColumn = ({ col, handler }) => {
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  //mount context
  const { addTodoToColumn, deleteTodoToColumn } = useContext(TaskColumnContext);

  const handleShowAddTodo = () => {
    setShowAddTodo(true);
  };

  /*       Adding todo         */
  const handleSubmit = (e) => {
    e.preventDefault();

    const newCol = { ...col };

    const newTodo = {
      _id: uuidv4(),
      user: newCol.user,
      task: newCol.task,
      title: todoTitle,
      content: "",
      status: "pending",
      completed: false,
      date: Date.now(),
      columnIndex: col.todos.length + 1,
    };

    newCol.todos.push(newTodo);
    addTodoToColumn();
    setTodoTitle("");
    setShowAddTodo(false);
  };

  /* ======================================== */

  /*       Deleting of Todo         */
  const handleDelete = (id) => {
    let newCol = { ...col };

    const wew = newCol.todos.filter((todo) => todo._id !== id);

    newCol = { ...newCol, todos: wew };

    deleteTodoToColumn(newCol);
  };
  /* ================================= */

  return (
    <TaskColumnWrapper>
      <PopupMenu col={col} handler={handler} />

      <h3>{col.columnName}</h3>
      <div className="addButtonContainer">
        <AddTodoBtn onClick={handleShowAddTodo} />
      </div>

      <div className="todoContainer">
        {col.todos.length === 0 ? (
          <div>Empty</div>
        ) : (
          col.todos.map((todo) => (
            <TodoCard
              key={todo._id}
              todo={todo}
              setShowModal={setShowModal}
              setCurrentTodo={setCurrentTodo}
            />
          ))
        )}
      </div>

      {showAddTodo && (
        <AddTodoForm>
          <input
            type="text"
            placeholder="Add Todo"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />

          <div className="formButtonContainer">
            <Button
              border="none"
              fontSize="1rem"
              hoverColor="yellow"
              onClick={handleSubmit}
            >
              Add
            </Button>

            <Button
              border="none"
              fontSize="1rem"
              hoverColor="yellow"
              onClick={() => setShowAddTodo(false)}
            >
              Cancel
            </Button>
          </div>
        </AddTodoForm>
      )}

      <Modal opacity="0.8" showModal={showModal} setShowModal={setShowModal}>
        <TodoContent
          todo={currentTodo}
          handleDelete={handleDelete}
          setShowModal={setShowModal}
        />
      </Modal>
    </TaskColumnWrapper>
  );
};

export default TaskColumn;
