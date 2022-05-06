import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import tasksData, * as fromTasks from "./tasks";
import configData, * as fromConfig from "./config";

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    tasksData,
    configData
  });

export default reducers;

export const selectTasks = (state) => fromTasks.selectTasks(state.tasksData);
export const selectConfig = (state) =>
  fromConfig.selectConfig(state.configData);
export const selectConfigLoadingState = (state) =>
  fromConfig.selectConfigLoadingState(state.configData);
