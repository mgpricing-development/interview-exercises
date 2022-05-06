import types from "../actionTypes";
import LoadingState from "../../utils/loading-state";

const INITIAL_STATE = {
  configLoadingState: LoadingState.UNINITIALIZED,
  config: []
};

const configReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_TASKS_REQUEST:
      return {
        ...state,
        configLoadingState: LoadingState.IN_PROGRESS
      };
    case types.GET_TASKS_SUCCESS:
      return {
        ...state,
        config: action.payload,
        configLoadingState: LoadingState.COMPLETED
      };
    case types.GET_TASKS_FAILURE:
      return {
        ...state,
        configLoadingState: LoadingState.FAILED
      };

    default:
      return state;
  }
};

export const selectConfig = (configData) => configData.config;
export const selectConfigLoadingState = (configData) =>
  configData.configLoadingState;

export default configReducer;
