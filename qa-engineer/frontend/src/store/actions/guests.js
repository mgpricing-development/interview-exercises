import types from "../actionTypes";
import guestsService from "../../services/guests.service";

export const registerGuest =
  ({ email, reportId }) =>
  (dispatch) => {
    dispatch({
      type: types.REGISTER_GUEST_REQUEST
    });

    guestsService
      .registerGuest({
        email,
        reportId
      })
      .then((payload) => {
        dispatch({
          type: types.REGISTER_GUEST_SUCCESS,
          payload
        });
      })
      .catch((error) => {
        dispatch({
          type: types.REGISTER_GUEST_FAILURE,
          error
        });
      });
  };

export const getGuest = () => (dispatch) => {
  dispatch({
    type: types.GET_GUEST_REQUEST
  });

  guestsService
    .getGuest()
    .then((payload) => {
      dispatch({
        type: types.GET_GUEST_SUCCESS,
        payload
      });
    })
    .catch((error) => {
      dispatch({
        type: types.GET_GUEST_FAILURE,
        error
      });
    });
};
