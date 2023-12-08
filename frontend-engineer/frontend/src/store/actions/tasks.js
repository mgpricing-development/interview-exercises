import types from "../actionTypes";
import tasksService from "../../services/tasks.service";

export const createTask =
  ({ name }) =>
  (dispatch) => {
    dispatch({
      type: types.CREATE_TASK_REQUEST
    });

    tasksService
      .createTask({
        name
      })
      .then((payload) => {
        dispatch({
          type: types.CREATE_TASK_SUCCESS,
          payload
        });
      })
      .catch((error) => {
        dispatch({
          type: types.CREATE_TASK_FAILURE,
          error
        });
      });
  };

export const deleteTask =
  ({ taskId }) =>
  (dispatch) => {
    dispatch({
      type: types.DELETE_TASK_REQUEST
    });

    tasksService
      .deleteTask({
        taskId
      })
      .then(() => {
        dispatch({
          type: types.DELETE_TASK_SUCCESS,
          payload: taskId
        });
      })
      .catch((error) => {
        dispatch({
          type: types.DELETE_TASK_FAILURE,
          error
        });
      });
  };

export const getTasks = () => (dispatch) => {
  dispatch({
    type: types.GET_TASKS_REQUEST
  });

  tasksService
    .getTasks()
    .then((payload) => {
      dispatch({
        type: types.GET_TASKS_SUCCESS,
        payload
      });
    })
    .catch((error) => {
      dispatch({
        type: types.GET_TASKS_FAILURE,
        error
      });
    });
};
