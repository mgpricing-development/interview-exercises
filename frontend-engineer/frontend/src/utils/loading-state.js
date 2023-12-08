const LoadingState = {
  UNINITIALIZED: "UNINITIALIZED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED"
};

export const combineLoadingStates = ([...loadingStates]) => {
  return loadingStates.reduce((previousState, currentState) => {
    switch (previousState) {
      case LoadingState.FAILED:
        return LoadingState.FAILED;
      default:
        switch (currentState) {
          case LoadingState.UNINITIALIZED:
          case LoadingState.FAILED:
            return currentState;
          default:
            if (
              previousState === LoadingState.COMPLETED &&
              currentState === LoadingState.COMPLETED
            ) {
              return LoadingState.COMPLETED;
            }

            return LoadingState.IN_PROGRESS;
        }
    }
  }, LoadingState.COMPLETED);
};

export default LoadingState;
