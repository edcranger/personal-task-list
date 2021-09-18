import React, { useReducer } from "react";

import { taskColumns } from "../../data/data";

//types
import {
  GET_ALL_TASKCOLUMNS,
  ADD_TASKCOLUMN,
  UPDATE_TASKCOLUMN,
  DELETE_TASKCOLUMN,
  IS_LOADING,
} from "../types";

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
    console.log(state.taskColumns);
  };

  return (
    <TaskColumnContext.Provider value={{ ...state, getAllColumns }}>
      {children}
    </TaskColumnContext.Provider>
  );
};

export default TaskColumnState;
