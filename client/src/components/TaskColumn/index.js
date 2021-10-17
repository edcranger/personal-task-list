import React, { useState, useContext } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

//styles
import {
  AddTodoBtn,
  AddTodoForm,
  TaskColumnWrapper,
  DroppableContainer,
} from "./TaskColumnElements";

//components
import TodoCard from "../Todo/TodoCard";
import Modal from "../Modal";
import TodoContent from "../Todo/TodoContent";
import PopupMenu from "../PopupMenu";
import Button from "../Button";

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
      task: newCol.task,
      title: todoTitle,
      content: "",
      columnIndex: col.todos.length + 1,
    };

    const payload = { newCol, newTodo };

    addTodoToColumn(payload);
    setTodoTitle("");
    setShowAddTodo(false);
  };

  /* ======================================== */

  /*       Deleting of Todo         */
  const handleDelete = (id) => {
    let newCol = { ...col };

    const filteredCol = newCol.todos.filter((todo) => todo._id !== id);

    newCol = { ...newCol, todos: filteredCol };

    const payload = { newCol, id };

    deleteTodoToColumn(payload);
  };
  /* ================================= */

  return (
    <TaskColumnWrapper>
      <PopupMenu col={col} handler={handler} />

      <h3>{col.columnName}</h3>
      <div className="addButtonContainer">
        <AddTodoBtn onClick={handleShowAddTodo} />
      </div>
      <Droppable droppableId={col._id}>
        {(provided, snapshot) => {
          return (
            <DroppableContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
              {...snapshot}
            >
              {col.todos
                .sort((a, b) => a.columnIndex - b.columnIndex)
                .map((todo, index) => (
                  <Draggable
                    key={todo._id}
                    draggableId={todo._id}
                    index={index}
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TodoCard
                            todo={todo}
                            setShowModal={setShowModal}
                            setCurrentTodo={setCurrentTodo}
                          />
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
              {provided.placeholder}
            </DroppableContainer>
          );
        }}
      </Droppable>

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
