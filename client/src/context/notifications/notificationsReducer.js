import {
  GET_NOTIFICATIONS,
  SET_NOTIFICATION_ERROR,
  CLICKED_NOTIFICATION,
  UPDATE_NOTIFICATION,
  UPDATE_NOTIFICATION_COUNT,
} from "../types";

const notifcationsReducer = (state, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...action.payload.notifications],
        notificationCount: [...action.payload.notifications].filter(
          (notif) => notif.isSeen === false
        ).length,
        loading: false,
      };
    case CLICKED_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map((notif) =>
          notif._id === action.payload ? { ...notif, isread: true } : notif
        ),
        loading: false,
      };
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map((notif) =>
          notif._id === action.payload._id
            ? {
                ...notif,
                contributor: { ...notif.contributor, status: "accepted" },
              }
            : notif
        ),
      };
    case UPDATE_NOTIFICATION_COUNT:
      return { ...state, notificationCount: 0 };
    case SET_NOTIFICATION_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default notifcationsReducer;
