import types from "../actionTypes";
import LoadingState from "../../utils/loading-state";

const INITIAL_STATE = {
  getTasksLoadingState: LoadingState.UNINITIALIZED,
  createTaskLoadingState: LoadingState.UNINITIALIZED,
  deleteTaskLoadingState: LoadingState.UNINITIALIZED,
  tasks: []
};

const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_TASKS_REQUEST:
      return {
        ...state,
        getTasksLoadingState: LoadingState.IN_PROGRESS
      };
    case types.GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        getTasksLoadingState: LoadingState.COMPLETED
      };
    case types.GET_TASKS_FAILURE:
      return {
        ...state,
        getTasksLoadingState: LoadingState.FAILED
      };

    case types.CREATE_TASK_REQUEST:
      return {
        ...state,
        createTaskLoadingState: LoadingState.IN_PROGRESS
      };
    case types.CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        createTaskLoadingState: LoadingState.COMPLETED
      };
    case types.CREATE_TASK_FAILURE:
      return {
        ...state,
        createTaskLoadingState: LoadingState.FAILED
      };

    case types.DELETE_TASK_REQUEST:
      return {
        ...state,
        deleteTaskLoadingState: LoadingState.IN_PROGRESS
      };
    case types.DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        deleteTaskLoadingState: LoadingState.COMPLETED
      };
    case types.DELETE_TASK_FAILURE:
      return {
        ...state,
        deleteTaskLoadingState: LoadingState.FAILED
      };

    default:
      return state;
  }
};

export const selectTasks = (tasksData) => tasksData.tasks;

export default tasksReducer;
