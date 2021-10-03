import {
  GET_CURRENT_TASK,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_CURRENT_TASK,
  CLEAR_CURRENT_TASK,
  SET_IS_EDITING,
  FILTER_TASKS,
  CLEAR_FILTER_TASKS,
  SHOW_MODAL,
} from "../types";

const taskReducer = (state, action) => {
  switch (action.type) {
    case GET_CURRENT_TASK:
      return {
        ...state,
        currentTask: state.tasks.find((task) => task._id === action.payload),
      };

    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
        currentTask: null,
        isEditing: false,
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        filtered:
          state.filtered !== null
            ? state.filtered.filter((task) => task._id !== action.payload)
            : null,
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

          return task.taskTitle.match(regex) || task.description.match(regex);
        }),
      };

    case CLEAR_FILTER_TASKS:
      return {
        ...state,
        filtered: null,
      };

    case SET_IS_EDITING:
      return { ...state, isEditing: action.payload };

    case SHOW_MODAL:
      return { ...state, showModal: action.payload };
    default:
      return state;
  }
};

export default taskReducer;
