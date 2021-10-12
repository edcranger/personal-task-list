import {
  GET_ALL_TASKCOLUMNS,
  ADD_TASKCOLUMN,
  UPDATE_TASKCOLUMN,
  UPDATE_ALL_TASKCOLUMN,
  DELETE_TASKCOLUMN,
  ADD_TODO,
  IS_LOADING,
} from "../types";

const taskReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_TASKCOLUMNS:
      return {
        ...state,
        currentTaskColumns: state.taskColumns.filter(
          (column) => column.task === action.payload
        ),
        isLoading: false,
      };

    case ADD_TASKCOLUMN:
      return {
        ...state,
        currentTaskColumns: [...state.currentTaskColumns, action.payload],
      };

    case DELETE_TASKCOLUMN:
      return {
        ...state,
        currentTaskColumns: state.currentTaskColumns.filter(
          (column) => column._id !== action.payload
        ),
      };

    case ADD_TODO:
      return { ...state };

    case UPDATE_TASKCOLUMN:
      const newTaskColumns = state.currentTaskColumns.map((taskCol) =>
        taskCol._id === action.payload._id ? action.payload : taskCol
      );

      return { ...state, currentTaskColumns: newTaskColumns };

    case UPDATE_ALL_TASKCOLUMN:
      const wew = [...state.taskColumns];

      action.payload.cols.forEach((col) => {
        const ind = wew.findIndex((ew) => ew._id === col._id);
        wew.splice(ind, 1, col);
      });

      return {
        ...state,
        taskColumns: wew,
        currentTaskColumns: action.payload.cols,
      };

    case IS_LOADING:
      return { ...state, isLoading: true };

    default:
      return state;
  }
};

export default taskReducer;
