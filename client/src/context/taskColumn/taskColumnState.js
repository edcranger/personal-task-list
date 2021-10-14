import React, { useReducer } from "react";
import Api from "../../Api";

import { taskColumns } from "../../data/data";

//types
import {
  GET_ALL_TASKCOLUMNS,
  ADD_TASKCOLUMN,
  UPDATE_TASKCOLUMN,
  DELETE_TASKCOLUMN,
  SET_LOADING,
  SET_TASKCOLUMN_ERROR,
  UPDATE_ALL_TASKCOLUMN,
} from "../types";

//Context and reducers
import taskColumnReducer from "./taskColumnReducer";
import TaskColumnContext from "./taskColumnContext";

const TaskColumnState = ({ children }) => {
  const initialState = {
    taskColumns,
    currentTaskColumns: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(taskColumnReducer, initialState);

  const getAllColumns = async (taskId) => {
    dispatch({ type: SET_LOADING });
    try {
      const res = await Api.get(`/api/tasks/${taskId}/task-column`);

      if (res.data.success) {
        dispatch({ type: GET_ALL_TASKCOLUMNS, payload: res.data.taskColumns });
      }
    } catch (err) {
      dispatch({
        type: SET_TASKCOLUMN_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const addTaskColumn = async (payload) => {
    const { taskId, newColumm } = payload;

    try {
      const res = await Api.post(`/api/tasks/${taskId}/task-column`, newColumm);

      if (res.data.success) {
        console.log(res.data.taskColumn);
        dispatch({ type: ADD_TASKCOLUMN, payload: res.data });
      }
    } catch (err) {
      dispatch({
        type: SET_TASKCOLUMN_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const updateTaskColumn = async (taskColumn) => {
    try {
      const res = await Api.put(
        `/api/task-column/${taskColumn._id}`,
        taskColumn
      );

      if (res.data.success) {
        dispatch({ type: UPDATE_TASKCOLUMN, payload: res.data.taskColumn });
      }
    } catch (err) {
      dispatch({
        type: SET_TASKCOLUMN_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const deleteTaskColumn = async (taskColumnId) => {
    try {
      const res = await Api.delete(`/api/task-column/${taskColumnId}`);

      if (res.data.success) {
        dispatch({ type: DELETE_TASKCOLUMN, payload: taskColumnId });
      }
    } catch (err) {
      dispatch({
        type: SET_TASKCOLUMN_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const addTodoToColumn = async (payload) => {
    const { newCol, newTodo } = payload;
    console.log(newTodo);
    try {
      const res = await Api.post(
        `/api/task-column/${newCol._id}/todos`,
        newTodo
      );

      if (res.data.success) {
        newCol.todos.push(res.data.todo);
        dispatch({ type: UPDATE_TASKCOLUMN, payload: newCol });
      }
    } catch (err) {
      dispatch({
        type: SET_TASKCOLUMN_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  /*  ====================================== */

  const updateAllTaskColumns = (cols) => {
    dispatch({ type: UPDATE_ALL_TASKCOLUMN, payload: cols });
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
        updateAllTaskColumns,
      }}
    >
      {children}
    </TaskColumnContext.Provider>
  );
};

export default TaskColumnState;
