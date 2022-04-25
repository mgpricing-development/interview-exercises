import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import tasksData, * as fromTasks from "./tasks";

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    tasksData
  });

export default reducers;

export const selectTasks = (state) => fromTasks.selectTasks(state.tasksData);
