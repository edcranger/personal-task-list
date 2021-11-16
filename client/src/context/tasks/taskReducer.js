import {
  FETCH_USER_TASKS,
  SET_LOADING,
  GET_CURRENT_TASK,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_CURRENT_TASK,
  CLEAR_CURRENT_TASK,
  SET_IS_EDITING,
  FILTER_TASKS,
  CLEAR_FILTER_TASKS,
  SET_TASK_ERROR,
} from "../types";

const taskReducer = (state, action) => {
  switch (action.type) {
    case FETCH_USER_TASKS:
      return {
        ...state,
        tasks: action.payload.task,
        loading: false,
      };

    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload.task] };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        filtered:
          state.filtered !== null
            ? state.filtered.filter((task) => task._id !== action.payload)
            : null,
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
        currentTask: null,
        isEditing: false,
      };

    case GET_CURRENT_TASK:
      return {
        ...state,
        currentTask: state.tasks.find((task) => task._id === action.payload),
      };

    case SET_CURRENT_TASK:
      return {
        ...state,
        currentTask: action.payload,
      };

    case CLEAR_CURRENT_TASK:
      return {
        ...state,
        currentTask: null,
      };

    case FILTER_TASKS:
      return {
        ...state,
        filtered: state.tasks.filter((task) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return task.taskTitle.match(regex);
        }),
      };

    case CLEAR_FILTER_TASKS:
      return {
        ...state,
        filtered: null,
      };

    case SET_IS_EDITING:
      return { ...state, isEditing: action.payload };

    case SET_LOADING: {
      return { ...state, loading: true };
    }
    case SET_TASK_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default taskReducer;
