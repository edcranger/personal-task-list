import React, { useReducer } from "react";
import Api from "../../Api";

import { GET_TODO, GET_TODO_CONTENTS, SET_TODO_ERROR } from "../types";

//context and reducer

import TodoContext from "./TodoContext";
import todosReducer from "./todosReducer";

const TodoState = ({ children }) => {
  const initialState = {
    todo: null,
    contents: null,
    isLoading: false,
  };

  const [state, dispatch] = useReducer(todosReducer, initialState);

  const getSingleTodo = async (todoId) => {
    try {
      const res = await Api.get(`/api/todos/${todoId}`);

      if (res.data.success) {
        dispatch({ type: GET_TODO, payload: res.data.todo });
      }
    } catch (err) {
      dispatch({ type: SET_TODO_ERROR, payload: err.response.data.message });
    }
  };

  const createContent = async (payload) => {
    const { todoId, formData } = payload;

    try {
      const res = await Api.post(
        `/api/todos/${todoId}/todo-contents`,
        formData,
        {
          description: "watitiw",
        }
      );

      if (res.data.success) {
        return res.data;
      }
    } catch (err) {
      dispatch({ type: SET_TODO_ERROR, payload: err.response.data.message });
    }
  };

  const getAllContent = async (todoId) => {
    try {
      const res = await Api.get(`/api/todos/${todoId}/todo-contents`);

      if (res.data.success) {
        dispatch({ type: GET_TODO_CONTENTS, payload: res.data });
      }
    } catch (err) {
      dispatch({ type: SET_TODO_ERROR, payload: err.response.data.message });
    }
  };

  return (
    <TodoContext.Provider
      value={{
        ...state,
        getSingleTodo,
        createContent,
        getAllContent,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoState;
