import React, { useReducer } from "react";

import { taskColumns } from "../../data/data";

//types
import {
  GET_ALL_TASKCOLUMNS,
  ADD_TASKCOLUMN,
  UPDATE_TASKCOLUMN,
  DELETE_TASKCOLUMN,
  ADD_TODO,
  DELETE_TODO,
  IS_LOADING,
} from "../types";

//Context and reducers
import taskColumnReducer from "./taskColumnReducer";
import TaskColumnContext from "./taskColumnContext";

const TaskColumnState = ({ children }) => {
  const initialState = {
    taskColumns,
    currentTaskColumn: null,
    isLoading: false,
  };

  const [state, dispatch] = useReducer(taskColumnReducer, initialState);

  const getAllColumns = (taskId) => {
    dispatch({ type: IS_LOADING });
    dispatch({ type: GET_ALL_TASKCOLUMNS, payload: taskId });
  };

  const addTaskColumn = (taskCol) => {
    dispatch({ type: ADD_TASKCOLUMN, payload: taskCol });
  };

  const updateTaskColumn = (col) => {
    dispatch({ type: UPDATE_TASKCOLUMN, payload: col });
  };

  const deleteTaskColumn = (id) => {
    dispatch({ type: DELETE_TASKCOLUMN, payload: id });
  };

  const addTodoToColumn = (todo) => {
    dispatch({ type: ADD_TODO, payload: todo });
  };

  const deleteTodoToColumn = (col) => {
    dispatch({ type: UPDATE_TASKCOLUMN, payload: col });
  };

  return (
    <TaskColumnContext.Provider
      value={{
        ...state,
        getAllColumns,
        addTaskColumn,
        updateTaskColumn,
        deleteTaskColumn,
        addTodoToColumn,
        deleteTodoToColumn,
      }}
    >
      {children}
    </TaskColumnContext.Provider>
  );
};

export default TaskColumnState;
