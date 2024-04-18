import types from "../actionTypes";

const INITIAL_STATE = {
  guest: null
};

const guestsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_GUEST_SUCCESS:
    case types.REGISTER_GUEST_SUCCESS:
      return {
        ...state,
        guest: action.payload
      };

    default:
      return state;
  }
};

export const selectGuest = (guestsData) => guestsData.guest;

export default guestsReducer;
