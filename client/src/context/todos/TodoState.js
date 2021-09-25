import React, { useReducer } from "react";

import {
  ADD_TODO,
  GET_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  FILTER_TODO,
  SET_CURRENT_TODO,
  CLEAR_CURRENT_TODO,
} from "../types";

//context and reducer
import TodoContext from "./TodoContext";
import todosReducer from "./todosReducer";

const TodoState = ({ children }) => {
  const initialState = {
    isLoading: false,
  };

  const [state, dispatch] = useReducer(todosReducer, initialState);

  const getTodosOfColumn = (taskColumnId) => {
    dispatch({ type: GET_TODO, payload: taskColumnId });
  };

  return (
    <TodoContext.Provider value={{ ...state, getTodosOfColumn }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoState;
