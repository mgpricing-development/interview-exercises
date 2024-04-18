import LoadingState from "../../utils/loading-state";

const INITIAL_STATE = {
  requests: {}
};

const splitActionType = (actionType) => {
  const matches = actionType.match(/^(.*)_([^_]+)$/);

  if (matches) {
    return {
      category: matches[1],
      type: matches[2]
    };
  }

  return {};
};

const requests = (state = INITIAL_STATE, action) => {
  const { category, type } = splitActionType(action.type);

  if (category) {
    const newState = { requests: { ...state.requests } };

    if (!newState.requests[category]) {
      newState.requests[category] = {
        loadingState: LoadingState.UNINITIALIZED,
        data: null,
        error: null,
        parameters: null
      };
    }

    if (action.parameters) {
      newState.requests[category].parameters = action.parameters;
    }

    switch (type) {
      case "REQUEST":
        newState.requests[category].loadingState = LoadingState.IN_PROGRESS;
        if (action.payload) {
          newState.requests[category].data = action.payload;
        }

        newState.requests[category].error = null;
        return newState;
      case "SUCCESS":
        newState.requests[category].loadingState = LoadingState.COMPLETED;
        newState.requests[category].data = action.payload;
        return newState;
      case "FAILURE":
        newState.requests[category].loadingState = LoadingState.FAILED;
        newState.requests[category].error = action.error;
        return newState;
    }
  }

  return state;
};

export const selectRequestState = (requestsData, actionType) => {
  const { category } = splitActionType(actionType);

  return requestsData.requests[category]
    ? requestsData.requests[category].loadingState
    : LoadingState.UNINITIALIZED;
};

export const selectRequestData = (requestsData, actionType) => {
  const { category } = splitActionType(actionType);

  return requestsData.requests[category]
    ? requestsData.requests[category].data
    : null;
};

export const selectRequestParameters = (requestsData, actionType) => {
  const { category } = splitActionType(actionType);

  return requestsData.requests[category]
    ? requestsData.requests[category].parameters
    : null;
};

export const selectRequestError = (requestsData, actionType) => {
  const { category } = splitActionType(actionType);

  return requestsData.requests[category]
    ? requestsData.requests[category].error
    : null;
};

export default requests;
