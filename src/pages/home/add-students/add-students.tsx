import { Button, Form, Input } from "antd";

import useAddStudentController from "./add-students-controller";
import { common, makeCustomMessage } from "../../../utills";

import { LeftOutlined, UserOutlined } from "@ant-design/icons";

const AddStudent: React.FC = () => {
  const { form, addStudentIsLoading, onFinish, onClickBack } =
    useAddStudentController();

  return (
    <div>
      <div className="header">
        <div className="header-title">
          <span className="back-icon" onClick={onClickBack}>
            <LeftOutlined className="antd-icon" />
          </span>
          <div className="title">{common.labels.add_student}</div>
        </div>
      </div>
      <div className="antd-form-outer">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label={common.labels.name}
            className="form-item-textbox"
            rules={[
              {
                required: true,
                message: makeCustomMessage(
                  common.labels.name,
                  common.messages.required
                ),
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="antd-icon" />}
              placeholder={common.labels.name}
              autoFocus
            />
          </Form.Item>
          <Form.Item className="margin-top-64">
            <Button
              type="primary"
              className="button"
              htmlType="submit"
              loading={addStudentIsLoading}
              ghost
            >
              {common.labels.add}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddStudent;
