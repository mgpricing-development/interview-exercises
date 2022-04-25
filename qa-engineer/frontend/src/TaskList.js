import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { selectTasks } from "./store/reducers";
import Task from "./Task";
import { useEffect } from "react";
import { getTasks } from "./store/actions/tasks";
import styled from "styled-components";

const TaskList = ({ getTasks, tasks }) => {
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <Container>
      <h1>Task List</h1>
      {tasks.map((task, index) => (
        <Task task={task} key={index} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 400px;
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
