import TaskList from "./TaskList";
import styled from "styled-components";

const App = () => {
  return (
    <Container>
      This is a simple task list. You can create and delete tasks from the list
      bellow. Task names shoud be unique.
      <TaskList />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

export default App;
