import React, { useReducer, useContext } from "react";

import { GET_TODO, ADD_TODO, DELETE_TODO } from "../types";

//context and reducer
import TaskColumnContext from "../taskColumn/taskColumnContext";
import TodoContext from "./TodoContext";
import todosReducer from "./todosReducer";

const TodoState = ({ children }) => {
  const { taskColumns, currentTaskColumns } = useContext(TaskColumnContext);

  const initialState = {
    taskColumns,
    currentTaskColumns,
    isLoading: false,
  };

  const [state, dispatch] = useReducer(todosReducer, initialState);

  const getAllColumns = (taskColumnId) => {
    dispatch({ type: GET_TODO, payload: taskColumnId });
  };

  const addTodoToColumn = (todo) => {
    dispatch({ type: ADD_TODO, payload: todo });
  };

  const deleteTodoToColumn = (payload) => {
    dispatch({ type: DELETE_TODO, payload });
  };

  return (
    <TodoContext.Provider
      value={{
        ...state,
        getAllColumns,
        addTodoToColumn,
        deleteTodoToColumn,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoState;
