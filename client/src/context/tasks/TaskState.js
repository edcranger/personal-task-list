import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import TaskContext from "./taskContext";
import taskReducer from "./taskReducer";

import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_CURRENT_TASK,
  CLEAR_CURRENT_TASK,
  FILTER_TASKS,
  CLEAR_FILTER_TASKS,
  SET_IS_EDITING,
  GET_CURRENT_TASK,
} from "../types";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      {
        _id: "1",
        taskTitle: "Kumain",
        description: "Masarap tlga ang ramen",
        complete: false,
        status: "pending",
        category: "Todo",
        date: "2021-09-05T16:00:11.627+00:00",
      },
      {
        _id: "2",
        taskTitle: "Matulog",
        description: "Humilik kahit nahihirapn",
        complete: false,
        status: "pending",
        category: "Todo",
        date: "2021-09-05T16:00:11.627+00:00",
      },
      {
        _id: "3",
        taskTitle: "Maglaro",
        description: "Valorant is the best",
        complete: false,
        status: "pending",
        category: "Todo",
        date: "2021-09-05T16:00:11.627+00:00",
      },
    ],
    currentTask: null,
    isEditing: false,
    filtered: null,
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  //Get Current Task
  const getCurrentTask = (id) => {
    dispatch({ type: GET_CURRENT_TASK, payload: id });
  };

  //Add Task
  const addTask = (task) => {
    task._id = uuidv4();

    dispatch({ type: ADD_TASK, payload: task });
  };

  //Update Task
  const updateTask = (task) => {
    dispatch({ type: UPDATE_TASK, payload: task });
  };

  //Delete Task
  const deleteTask = (id) => {
    dispatch({ type: DELETE_TASK, payload: id });
  };

  //Set current task
  const setCurrentTask = (task) => {
    dispatch({ type: SET_CURRENT_TASK, payload: task });
  };

  //Clear current task
  const clearCurrentTask = () => {
    dispatch({ type: CLEAR_CURRENT_TASK });
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

  return (
    <TaskContext.Provider
      value={{
        ...state,
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
