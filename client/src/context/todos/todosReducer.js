import {
  DELETE_TODO,
  ADD_TODO,
  GET_ALL_TASK_CURRENT_TASKCOLUMN,
} from "../types";

const todosReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_TASK_CURRENT_TASKCOLUMN:
      return { ...state, currentTaskColumns: action.payload };

    case ADD_TODO:
      return { ...state };

    case DELETE_TODO:
      const newTaskColumns = state.currentTaskColumns.map((taskCol) =>
        taskCol._id === action.payload._id ? action.payload : taskCol
      );

      return { ...state, currentTaskColumns: newTaskColumns };

    default:
      return state;
  }
};

export default todosReducer;
