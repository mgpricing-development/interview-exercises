import { combineReducers } from "redux";
import configData, * as fromConfig from "./config";
import cookiesData, * as fromCookies from "./cookies";
import guestsData, * as fromGuests from "./guests";
import requestsData, * as fromRequests from "./requests";
import tasksData, * as fromTasks from "./tasks";

const reducers = () =>
  combineReducers({
    configData,
    cookiesData,
    guestsData,
    requestsData,
    tasksData
  });

export default reducers;

export const selectTasks = (state) => fromTasks.selectTasks(state.tasksData);
export const selectCreateTaskLoadingState = (state) =>
  fromTasks.selectCreateTaskLoadingState(state.tasksData);
export const selectCreateTaskError = (state) =>
  fromTasks.selectCreateTaskError(state.tasksData);

export const selectConfig = (state) =>
  fromConfig.selectConfig(state.configData);
export const selectConfigLoadingState = (state) =>
  fromConfig.selectConfigLoadingState(state.configData);

export const selectGuest = (state) => fromGuests.selectGuest(state.guestsData);

export const selectCookie = (state, name) =>
  fromCookies.selectCookie(state.cookiesData, name);

export const selectRequestData = (state, actionType) =>
  fromRequests.selectRequestData(state.requestsData, actionType);
export const selectRequestState = (state, actionType) =>
  fromRequests.selectRequestState(state.requestsData, actionType);
export const selectRequestError = (state, actionType) =>
  fromRequests.selectRequestError(state.requestsData, actionType);
