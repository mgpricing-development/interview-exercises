import { bindActionCreators, compose } from "redux";
import { createTask } from "../../store/actions/tasks";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";

const TaskForm = ({ createTask }) => {
  const [form] = Form.useForm();

  const onFinish = ({ name }) => {
    createTask({ name });
  };

  return (
    <div>
      <Form
        name="basic"
        form={form}
        layout={"inline"}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item name="name">
          <Input placeholder={"Task name"} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add a New Task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createTask
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(TaskForm);
