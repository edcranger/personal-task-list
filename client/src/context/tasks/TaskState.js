import React, { useReducer } from "react";
import uuid from "uuid";

import TaskContext from "./taskContext";
import taskReducer from "./taskReducer";

import { ADD_TASK, UPDATE_TASK, DELETE_TASK, FILTER_TASK } from "../types";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      {
        _id: 1,
        taskTitle: "Kumain",
        description: "Masarap tlga ang ramen",
        complete: false,
        status: "pending",
        date: "2021-09-05T16:00:11.627+00:00",
      },
      {
        _id: 2,
        taskTitle: "Matulog",
        description: "Humilik kahit nahihirapn",
        complete: false,
        status: "pending",
        date: "2021-09-05T16:00:11.627+00:00",
      },
      {
        _id: 3,
        taskTitle: "Maglaro",
        description: "Valorant is the best",
        complete: false,
        status: "pending",
        date: "2021-09-05T16:00:11.627+00:00",
      },
    ],
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  //Add Task

  //Set current task

  //Clear current task

  //Delete Task

  //Update Task

  //Filter Task

  return (
    <TaskContext.Provider value={{ tasks: state.tasks }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
