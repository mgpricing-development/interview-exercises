import TaskList from "./TaskList";
import styled from "styled-components";

const App = () => {
  return (
    <Container>
      <TaskList />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default App;
