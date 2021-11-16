import React, { useReducer, useContext, useCallback } from "react";
import Api from "../../Api";

//context and reducer
import ContributorContext from "./contributorContext";
import contributorReducer from "./contributorReducer";

//TYPES

import {
  CLEAR_SEARCH_CONTRIBUTORS,
  SEARCH_CONTRIBUTORS,
  SET_CONTRIBUTORS_ERROR,
  ADD_CONTRIBUTOR,
  GET_CONTRIBUTIONS,
} from "../types";

const ContributorState = ({ children }) => {
  const initialState = {
    loading: false,
    searched: [],
    error: null,
    invites: null,
    contributions: [],
  };

  const [state, dispatch] = useReducer(contributorReducer, initialState);

  const searchContributor = async (payload) => {
    const { taskId, searchText } = payload;

    try {
      if (searchText.length < 3) {
        return dispatch({ type: CLEAR_SEARCH_CONTRIBUTORS });
      }
      const res = await Api.get(
        `/api/tasks/${taskId}/contributors/${searchText}`
      );

      if (res.data.success) {
        dispatch({ type: SEARCH_CONTRIBUTORS, payload: res.data.users });
      }
    } catch (err) {
      dispatch({
        type: SET_CONTRIBUTORS_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const getContributions = async () => {
    try {
      const res = await Api.get(`/api/contributors/getAssignedTasks`);

      if (res.data.success) {
        dispatch({ type: GET_CONTRIBUTIONS, payload: res.data.assignedTasks });
      }
    } catch (err) {
      dispatch({
        type: SET_CONTRIBUTORS_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const addContributor = async (payload, cb) => {
    const { taskId, contributorId, full_name } = payload;
    try {
      const res = await Api.post(`/api/tasks/${taskId}/contributors`, {
        contributorId,
      });

      if (res.data.success) {
        const { status } = res.data.contributor;

        cb({
          type: "task-invite",
          contributor: res.data.contributor._id,
          receiver: contributorId,
          content: " invited you as a contributor for ",
        });

        dispatch({
          type: ADD_CONTRIBUTOR,
          payload: { _id: contributorId, full_name, status },
        });
      }

      return res.data;
    } catch (err) {
      dispatch({
        type: SET_CONTRIBUTORS_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const acceptInvite = async (id, cb) => {
    try {
      const res = await Api.put(`/api/contributors/${id}/accept-invite`);

      return res.data;
    } catch (err) {
      dispatch({
        type: SET_CONTRIBUTORS_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const declineInvite = async (id) => {
    try {
      const res = await Api.put(`/api/contributors/${id}/decline-invite`);

      return res.data;
    } catch (err) {
      dispatch({
        type: SET_CONTRIBUTORS_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const clearContributors = () => {
    dispatch({ type: CLEAR_SEARCH_CONTRIBUTORS });
  };

  return (
    <ContributorContext.Provider
      value={{
        ...state,
        addContributor,
        searchContributor,
        clearContributors,
        acceptInvite,
        declineInvite,
        getContributions,
      }}
    >
      {children}
    </ContributorContext.Provider>
  );
};

export default ContributorState;
