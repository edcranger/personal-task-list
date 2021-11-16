import React, { useReducer, useState, useContext, useEffect } from "react";
import Api from "../../Api";

import {
  GET_NOTIFICATIONS,
  CLICKED_NOTIFICATION,
  SET_NOTIFICATION_ERROR,
  UPDATE_NOTIFICATION,
  UPDATE_NOTIFICATION_COUNT,
} from "../types";

//context and reducer
import NotificationsContext from "./notificationsContext";
import notificationsReducer from "./notificationsReducer";

const NotificationsState = ({ children }) => {
  const initialState = {
    notifications: [],
    notificationCount: 0,
    error: null,
  };

  const getNotifications = async () => {
    try {
      const res = await Api.get(`/api/notifications`);

      if (res.data.success) {
        dispatch({ type: GET_NOTIFICATIONS, payload: res.data });
      }
    } catch (err) {
      dispatch({
        type: SET_NOTIFICATION_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const createNotification = async (notificationPayload) => {
    try {
      const res = await Api.post(`/api/notifications`, {
        ...notificationPayload,
      });
    } catch (err) {
      dispatch({
        type: SET_NOTIFICATION_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const SeeAllNotifications = async (clickPayload) => {
    const { type } = clickPayload;

    if (!state.notificationCount) return;

    try {
      const res = await Api.put(`/api/notifications/interactions`, { type });

      if (res.data.success) {
        dispatch({ type: UPDATE_NOTIFICATION_COUNT });
      }
    } catch (err) {
      dispatch({
        type: SET_NOTIFICATION_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const clickSingleNotifcation = async (clickPayload) => {
    const { type, _id, read } = clickPayload;

    if (read) return;
    try {
      console.log("run");
      const res = await Api.put(`/api/notifications/interactions`, {
        type,
        _id,
      });

      if (res.data.success) {
        dispatch({ type: CLICKED_NOTIFICATION, payload: _id });
      }
    } catch (err) {
      dispatch({
        type: SET_NOTIFICATION_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const UpdateNotfications = (notifPayload) => {
    const { _id, data } = notifPayload;

    switch (data) {
      case "inviteAccepted":
        return dispatch({ type: UPDATE_NOTIFICATION, payload: { _id, data } });

      default:
        return;
    }
  };

  const [state, dispatch] = useReducer(notificationsReducer, initialState);

  return (
    <NotificationsContext.Provider
      value={{
        ...state,
        getNotifications,
        createNotification,
        SeeAllNotifications,
        clickSingleNotifcation,
        UpdateNotfications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsState;
