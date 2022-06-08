import styled from "styled-components";
import { bindActionCreators, compose } from "redux";
import { deleteTask } from "./store/actions/tasks";
import { connect } from "react-redux";

const Task = ({ task }) => {
  return (
    <Container data-cy={"task"}>
      <Name data-cy={"task-name"}>{task.name}</Name>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid black;
  background: pink;
  padding: 5px;
  margin: 5px;
  display: flex;
  flex-direction: row;
`;

const Name = styled.div`
  flex: 1;
  text-align: left;
`;

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deleteTask
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(Task);
