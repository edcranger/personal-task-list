import React, { useReducer } from "react";
import Api from "../../Api";

//Context and reducers
import TaskContext from "./taskContext";
import taskReducer from "./taskReducer";

import {
  FETCH_USER_TASKS,
  SET_LOADING,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_TASK_ERROR,
  SET_CURRENT_TASK,
  CLEAR_CURRENT_TASK,
  FILTER_TASKS,
  CLEAR_FILTER_TASKS,
  SET_IS_EDITING,
  GET_CURRENT_TASK,
  TASKS_FETCH_FAIL,
} from "../types";

const TaskState = (props) => {
  const initialState = {
    tasks: [],
    currentTask: null,
    isEditing: false,
    filtered: null,
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  //Get all tasks of user --- in use
  const getAllTaskOfUser = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const res = await Api.get("/api/tasks");

      if (res.data.success) {
        dispatch({ type: FETCH_USER_TASKS, payload: res.data });
      }
    } catch (err) {
      dispatch({ type: TASKS_FETCH_FAIL, payload: err.response.data.message });
    }
  };

  //Add Task
  const addTask = async (task) => {
    try {
      const res = await Api.post("/api/tasks", task);

      if (res.data.success) {
        dispatch({ type: ADD_TASK, payload: res.data });
      }
    } catch (err) {
      dispatch({ type: SET_TASK_ERROR, payload: err.response.data.message });
    }
  };

  //Update Task
  const updateTask = async (task) => {
    try {
      const { id } = task;

      const res = await Api.put(`/api/tasks/${id}`, task);

      if (res.data.success) {
        dispatch({ type: UPDATE_TASK, payload: task });
      }
    } catch (err) {
      dispatch({ type: SET_TASK_ERROR, payload: err.response.data.message });
    }
  };

  //Delete Task
  const deleteTask = async (id) => {
    try {
      const res = await Api.delete(`/api/tasks/${id}`);

      if (res.data.success) {
        dispatch({ type: DELETE_TASK, payload: id });
      }
    } catch (err) {
      dispatch({ type: SET_TASK_ERROR, payload: err.response.data.message });
    }
  };

  //Filter Task
  const filterTasks = (text) => {
    dispatch({ type: FILTER_TASKS, payload: text });
  };

  const clearFilterTasks = () => {
    dispatch({ type: CLEAR_FILTER_TASKS });
  };

  //isEditing?
  const userEditing = (editing) => {
    dispatch({ type: SET_IS_EDITING, payload: editing });
  };

  /* ======================================================================== */

  //Get Current Task
  const getCurrentTask = (id) => {
    dispatch({ type: GET_CURRENT_TASK, payload: id });
  };

  //Set current task
  const setCurrentTask = (task) => {
    dispatch({ type: SET_CURRENT_TASK, payload: task });
  };

  //Clear current task
  const clearCurrentTask = () => {
    dispatch({ type: CLEAR_CURRENT_TASK });
  };

  return (
    <TaskContext.Provider
      value={{
        ...state,
        getAllTaskOfUser,
        getCurrentTask,
        addTask,
        deleteTask,
        setCurrentTask,
        clearCurrentTask,
        filterTasks,
        clearFilterTasks,
        userEditing,
        updateTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
