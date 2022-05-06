import types from "../actionTypes";
import LoadingState from "../../utils/loading-state";

const INITIAL_STATE = {
  configLoadingState: LoadingState.UNINITIALIZED,
  config: null
};

const configReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CONFIG_REQUEST:
      return {
        ...state,
        configLoadingState: LoadingState.IN_PROGRESS
      };
    case types.CONFIG_SUCCESS:
      return {
        ...state,
        config: action.payload,
        configLoadingState: LoadingState.COMPLETED
      };
    case types.CONFIG_FAILURE:
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
