import {
  GET_ALL_TASKCOLUMNS,
  ADD_TASKCOLUMN,
  UPDATE_TASKCOLUMN,
  DELETE_TASKCOLUMN,
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

    case IS_LOADING:
      return { ...state, isLoading: true };
  }
};

export default taskReducer;
