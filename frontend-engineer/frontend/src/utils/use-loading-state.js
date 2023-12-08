import { useEffect, useState } from "react";
import LoadingState from "./loading-state";

const useLoadingState = (loadingState, onSuccess, onFailure) => {
  const [isInProgress, setInProgress] = useState(false);

  useEffect(() => {
    switch (loadingState) {
      case LoadingState.IN_PROGRESS:
        setInProgress(true);
        break;
      case LoadingState.COMPLETED:
        if (isInProgress) {
          setInProgress(false);
          onSuccess();
        }
        break;
      case LoadingState.FAILED:
        if (isInProgress) {
          setInProgress(false);
          if (onFailure) {
            onFailure();
          }
        }
        break;
    }
  }, [loadingState]);
};

export default useLoadingState;
