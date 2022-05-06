import TaskList from "./TaskList";
import styled from "styled-components";
import useLoadingState from "./utils/use-loading-state";
import { message } from "antd";
import LoadingState from "./utils/loading-state";
import { selectConfigLoadingState } from "./store/reducers";
import { bindActionCreators, compose } from "redux";
import { getConfig } from "./store/actions/config";
import { connect } from "react-redux";
import { useEffect } from "react";

const App = ({ getConfig, configLoadingState }) => {
  useEffect(() => {
    if (configLoadingState === LoadingState.UNINITIALIZED) {
      console.log("getConfig", getConfig);
      getConfig();
    }
  }, [configLoadingState, getConfig]);

  useLoadingState(
    configLoadingState,
    () => {},
    () => {
      message.error("Error loading config");
    }
  );

  console.log("configLoadingState", configLoadingState);

  switch (configLoadingState) {
    case LoadingState.UNINITIALIZED:
    case LoadingState.IN_PROGRESS:
      return "Loading...";
    case LoadingState.FAILED:
      return "Failed to Load";
    default:
      return (
        <Container>
          This is a simple task list. You can create and delete tasks from the
          list bellow. Task names shoud be unique.
          <TaskList />
        </Container>
      );
  }
};

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const mapStateToProps = (state) => ({
  configLoadingState: selectConfigLoadingState(state)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getConfig
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);
