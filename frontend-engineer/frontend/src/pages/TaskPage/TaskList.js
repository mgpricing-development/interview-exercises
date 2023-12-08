import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import {
  selectCreateTaskError,
  selectCreateTaskLoadingState,
  selectTasks
} from "../../store/reducers";
import Task from "./Task";
import { getTasks } from "../../store/actions/tasks";
import styled from "styled-components";
import TaskForm from "./TaskForm";
import { useEffect } from "react";
import { message } from "antd";
import useLoadingState from "../../utils/use-loading-state";

const TaskList = ({
  getTasks,
  tasks,
  createTaskError,
  createTaskLoadingState
}) => {
  useEffect(() => {
    setTimeout(() => {
      getTasks();
      console.log("getTasks");
    }, 0);
  }, []);

  useLoadingState(
    createTaskLoadingState,
    () => {},
    () => {
      if (createTaskError.status === 409) {
        message.error("This task already exists");
      } else {
        message.error("Failed to add a new Task");
      }
    }
  );

  return (
    <Container>
      <h1 data-cy={"task-list-header"}>Task List ({tasks.length} items)</h1>
      <TaskForm />
      {tasks.map((task, index) => (
        <Task task={task} key={index} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  margin: auto;
  width: 50%;
`;

const mapStateToProps = (state) => ({
  tasks: selectTasks(state),
  createTaskLoadingState: selectCreateTaskLoadingState(state),
  createTaskError: selectCreateTaskError(state)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTasks
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(TaskList);
