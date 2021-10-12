//types
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  SET_LOADING,
  LOGOUT,
} from "../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
        loading: false,
      };

    case LOGOUT:
      return {
        ...state,
        token: "",
        isAuthenticated: false,
        user: null,
        error: null,
        loading: false,
      };

    case USER_LOADED:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
      };

    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default authReducer;
