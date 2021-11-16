import {
  SEARCH_CONTRIBUTORS,
  CLEAR_SEARCH_CONTRIBUTORS,
  SET_CONTRIBUTORS_ERROR,
  GET_CONTRIBUTOR_INVITES,
  SET_LOADING,
  ADD_CONTRIBUTOR,
  GET_CONTRIBUTIONS,
} from "../types";

const contributorReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTRIBUTOR:
      return {
        ...state,
        searched: state.searched.map((contributor) =>
          contributor._id === action.payload._id
            ? { ...action.payload }
            : contributor
        ),
        loading: false,
      };
    case GET_CONTRIBUTIONS:
      return { ...state, contributions: action.payload, loading: false };
    case SEARCH_CONTRIBUTORS:
      return { ...state, searched: action.payload, loading: false };
    case CLEAR_SEARCH_CONTRIBUTORS:
      return { ...state, searched: [] };
    case GET_CONTRIBUTOR_INVITES:
      return { ...state, invites: action.payload, loading: false };
    case SET_CONTRIBUTORS_ERROR:
      return { ...state, error: action.payload, loading: false };
    case SET_LOADING:
      return { ...state, loading: true };
    default:
      return { ...state };
  }
};

export default contributorReducer;
