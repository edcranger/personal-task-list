import { GET_TODO, GET_TODO_CONTENTS, SET_TODO_ERROR } from "../types";

const todosReducer = (state, action) => {
  switch (action.type) {
    case GET_TODO:
      return { ...state, todo: action.payload, isLoading: false };
    case GET_TODO_CONTENTS:
      return { ...state, contents: action.payload.contents, isLoading: false };
    case SET_TODO_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

export default todosReducer;
