import { combineReducers } from "redux";
import tasksData, * as fromTasks from "./tasks";

const reducers = () =>
  combineReducers({
    tasksData
  });

export default reducers;

export const selectTasks = (state) => fromTasks.selectTasks(state.tasksData);
export const selectCreateTaskLoadingState = (state) =>
  fromTasks.selectCreateTaskLoadingState(state.tasksData);
export const selectCreateTaskError = (state) =>
  fromTasks.selectCreateTaskError(state.tasksData);
