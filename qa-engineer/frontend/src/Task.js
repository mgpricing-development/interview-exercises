import styled from "styled-components";
import { bindActionCreators, compose } from "redux";
import { deleteTask } from "./store/actions/tasks";
import { connect } from "react-redux";
import { Button } from "antd";

const Task = ({ task, deleteTask }) => {
  const onDelete = () => {
    deleteTask({ taskId: task._id });
  };

  return (
    <Container>
      <Name>{task.name}</Name>
      <Action>
        <Button onClick={onDelete}>Delete</Button>
      </Action>
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

const Action = styled.div``;

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deleteTask
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(Task);
