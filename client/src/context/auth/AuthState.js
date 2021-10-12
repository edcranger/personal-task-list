import React, { useReducer } from "react";
import Api from "../../Api";
import Cookies from "js-cookie";
import setAuthToken from "../../Utils/setAuthToken";

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
} from "../types";
import axios from "axios";

const AuthState = ({ children }) => {
  const initialState = {
    token: Cookies.get("csrf_id") || "",
    isAuthenticated: Cookies.get("csrf_id") ? true : false,
    user: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load User
  const loadUser = async () => {
    setAuthToken(state.token);
    try {
      const res = await axios.get("/api/users/getme");

      if (res.data.success) {
        dispatch({ type: USER_LOADED, payload: res.data });
      } else {
        dispatch({ type: SET_LOADING, payload: false });
      }
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.message });
    }
  };

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
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      return res.data;
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.message });
    }
  };

  // Logout
  const logout = async () => {
    dispatch({ type: LOGOUT });
    Cookies.remove("token");
    Cookies.remove("csrf_id");
  };

  return (
    <AuthContext.Provider value={{ ...state, signup, login, loadUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
