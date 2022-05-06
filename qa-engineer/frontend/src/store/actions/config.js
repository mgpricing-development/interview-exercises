import types from "../actionTypes";
import configService from "../../services/config.service";

export const getConfig = () => (dispatch) => {
  dispatch({
    type: types.CONFIG_REQUEST
  });

  configService
    .getConfig()
    .then((payload) => {
      dispatch({
        type: types.CONFIG_SUCCESS,
        payload
      });
    })
    .catch((error) => {
      dispatch({
        type: types.CONFIG_FAILURE,
        error
      });
    });
};
