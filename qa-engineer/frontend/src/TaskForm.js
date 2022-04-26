import styled from "styled-components";
import { bindActionCreators, compose } from "redux";
import { createTask } from "./store/actions/tasks";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";

const TaskForm = ({ createTask }) => {
  const [form] = Form.useForm();

  const onFinish = ({ name }) => {
    createTask({ name });
  };

  return (
    <Container>
      <Form
        name="basic"
        form={form}
        layout={"inline"}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item name="name">
          <Input placeholder={"Task nane"} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add a New Task
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: row;
`;

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createTask
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(TaskForm);
