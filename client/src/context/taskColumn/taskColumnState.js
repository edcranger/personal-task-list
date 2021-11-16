import React, { useReducer, useCallback } from "react";
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
  CLEAR_TASKCOLUMNS,
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

  /* ====================Fetch all columns of user ==================== */
  const getAllColumns = useCallback(async (taskId) => {
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
  }, []);

  /* ====================Add new column ==================== */
  const addTaskColumn = async (payload) => {
    const { taskId, newColumm } = payload;

    try {
      const res = await Api.post(`/api/tasks/${taskId}/task-column`, newColumm);

      if (res.data.success) {
        dispatch({ type: ADD_TASKCOLUMN, payload: res.data.taskColumn });
      }
    } catch (err) {
      dispatch({
        type: SET_TASKCOLUMN_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  /* ====================Update a column ==================== */
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

  /* ====================Delete a column ==================== */
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

  /* ====================Add a new todo inside acolumn ===================*/
  const addTodoToColumn = async (payload) => {
    const { newCol, newTodo } = payload;

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

  /* ===================Delete a new todo inside acolumn ===================*/
  const deleteTodoToColumn = async (payload) => {
    const { newCol, id } = payload;
    try {
      const res = await Api.delete(`/api/todos/${id}`);

      if (res.data.success) {
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

  const updateAllTaskColumns = async (payload) => {
    const { cols } = payload;

    try {
      const res = await Api.put(`/api/todos/dragdrop`, cols);

      if (res.data.success) {
        dispatch({ type: UPDATE_ALL_TASKCOLUMN, payload: cols });
      }
    } catch (err) {
      console.log(err);
      /*      dispatch({
        type: SET_TASKCOLUMN_ERROR,
        payload: err.response.data.message,
      });  */
    }
  };

  const clearColumns = () => {
    dispatch({ type: "CLEAR_TASKCOLUMNS" });
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
        clearColumns,
      }}
    >
      {children}
    </TaskColumnContext.Provider>
  );
};

export default TaskColumnState;
