import Cookies from "js-cookie";
import types from "../actionTypes";

export const setCookie =
  ({ name, value, expires }) =>
  (dispatch) => {
    const options = {
      path: "/",
      sameSite: "Strict",
      secure: window.location.protocol === "https:"
    };

    if (expires) {
      options.expires = expires;
    }

    Cookies.set(`cuvama_${name}`, value, options);

    const newValue = Cookies.get(`cuvama_${name}`);

    if (newValue) {
      dispatch({
        type: types.SET_COOKIE,
        payload: {
          name,
          value: newValue
        }
      });
    }
  };
