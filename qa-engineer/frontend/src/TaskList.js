import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { selectTasks } from "./store/reducers";
import Task from "./Task";
import { useEffect } from "react";
import { getTasks } from "./store/actions/tasks";
import styled from "styled-components";
import TaskForm from "./TaskForm";

const TaskList = ({ getTasks, tasks }) => {
  useEffect(() => {
    getTasks();
  }, [getTasks]);

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
  tasks: selectTasks(state)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTasks
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(TaskList);
