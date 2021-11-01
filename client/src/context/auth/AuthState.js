import React, { useReducer, useCallback } from "react";
import Api from "../../Api";
import Cookies from "js-cookie";

//context
import AuthContext from "./authContext";
import authReducer from "./authReducer";

//types
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  LOGOUT,
  SET_LOADING,
  SEARCH_USER,
  SET_USER_ERROR,
} from "../types";

const AuthState = ({ children }) => {
  const initialState = {
    token: Cookies.get("csrf_id") || "",
    isAuthenticated: Cookies.get("csrf_id") ? true : false,
    user: null,
    loading: true,
    error: null,
    searchedUser: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load User
  const loadUser = useCallback(async () => {
    try {
      const res = await Api.get("/api/users/getme");
      if (res.data.success) {
        dispatch({ type: USER_LOADED, payload: res.data });
      } else {
        dispatch({ type: SET_LOADING, payload: false });
      }
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.message });
    }
  }, []);

  //Register User
  const signup = async (formData) => {
    try {
      const res = await Api.post("/api/users", formData);

      if (res.data.success) {
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      }

      loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.message });
    }
  };

  //Login user
  const login = async (formData) => {
    try {
      const res = await Api.post("/api/users/login", formData);

      if (res.data.success) {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });

        return res.data;
      }
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.message });
    }
  };

  // Logout
  const logout = async () => {
    dispatch({ type: LOGOUT });
    Cookies.remove("token");
    Cookies.remove("csrf_id");
  };

  const searchUser = async (userId) => {
    dispatch({ type: SET_LOADING });
    console.log();
    try {
      if (userId.length < 3) {
        return dispatch({ type: SEARCH_USER, payload: [] });
      }
      const res = await Api.get(`/api/users/search/${userId}`);

      if (res.data.success) {
        dispatch({ type: SEARCH_USER, payload: res.data.user });
      } else {
        dispatch({ type: SEARCH_USER, payload: [] });
      }
    } catch (err) {
      dispatch({ type: SET_USER_ERROR, payload: err.response.data.message });
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, signup, login, loadUser, logout, searchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
