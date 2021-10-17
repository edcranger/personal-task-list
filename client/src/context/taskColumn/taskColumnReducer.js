import {
  GET_ALL_TASKCOLUMNS,
  ADD_TASKCOLUMN,
  UPDATE_TASKCOLUMN,
  UPDATE_ALL_TASKCOLUMN,
  DELETE_TASKCOLUMN,
  SET_TASKCOLUMN_ERROR,
  SET_LOADING,
} from "../types";

const taskReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_TASKCOLUMNS:
      return {
        ...state,
        currentTaskColumns: action.payload,
        loading: false,
      };

    case ADD_TASKCOLUMN:
      return {
        ...state,
        currentTaskColumns: [...state.currentTaskColumns, action.payload],
        loading: false,
      };

    case DELETE_TASKCOLUMN:
      return {
        ...state,
        currentTaskColumns: state.currentTaskColumns.filter(
          (column) => column._id !== action.payload
        ),
      };

    case UPDATE_TASKCOLUMN:
      const newTaskColumns = state.currentTaskColumns.map((taskCol) =>
        taskCol._id === action.payload._id ? action.payload : taskCol
      );

      return { ...state, currentTaskColumns: newTaskColumns };

    case UPDATE_ALL_TASKCOLUMN:
      const wew = [...state.currentTaskColumns];

      action.payload.forEach((col) => {
        const index = wew.findIndex((ew) => ew._id === col._id);
        wew.splice(index, 1, col);
      });

      return {
        ...state,
        currentTaskColumns: wew,
      };

    case SET_TASKCOLUMN_ERROR:
      return { ...state };

    case SET_LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
};

export default taskReducer;
