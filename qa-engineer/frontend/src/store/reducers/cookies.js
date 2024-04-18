import actionTypes from "../actionTypes";
import Cookies from "js-cookie";

const getInitialCookieData = () => {
  const data = {};

  for (const [name, value] of Object.entries(Cookies.get())) {
    const matches = name.match(/^cuvama_(.*)$/);

    if (matches) {
      data[matches[1]] = decodeURI(value);
    }
  }

  return data;
};

const INITIAL_STATE = {
  cookies: getInitialCookieData()
};

const cookiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_COOKIE:
    case actionTypes.SET_COOKIE:
      const newCookies = {
        ...state.cookies
      };

      newCookies[action.payload.name] = action.payload.value;
      return {
        cookies: newCookies
      };
  }

  return state;
};

export const selectCookie = (cookiesData, name) => {
  return cookiesData.cookies[name];
};

export default cookiesReducer;
