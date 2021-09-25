import {
  ADD_TODO,
  GET_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  FILTER_TODO,
  SET_CURRENT_TODO,
  CLEAR_CURRENT_TODO,
} from "../types";

const todosReducer = (state, action) => {
  switch (action.type) {
    case GET_TODO:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default todosReducer;
