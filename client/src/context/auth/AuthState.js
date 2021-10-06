import React, { useReducer } from "react";

//context
import AuthContext from "./authContext";
import authReducer from "./authReducer";

//types
import { REGISTER_SUCCESS } from "../types";

const AuthState = ({ children }) => {
  const initialState = {
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
  };

  const [state, dispath] = useReducer(authReducer, initialState);

  //Load User

  //Register User

  //Login user

  // Logout

  // clear errors

  return (
    <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>
  );
};

export default AuthState;
