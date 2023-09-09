import { Button, Form, Input } from "antd";
import { common, makeCustomMessage } from "../../../utills";
import useForgotPasswordController from "./forgot-password-controller";

import { UserOutlined } from "@ant-design/icons";

const ForgotPassword: React.FC = () => {
  const { form, onFinish } = useForgotPasswordController();

  return (
    <div className="center-and-middle">
      <Form className="login-form" form={form} onFinish={onFinish}>
        <div className="big-text large-font-size">
          {common.labels.forgot_password}
        </div>
        <Form.Item
          name="email"
          className="form-item-textbox"
          rules={[
            {
              required: true,
              message: makeCustomMessage(
                common.labels.email,
                common.messages.required
              ),
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="antd-icon" />}
            placeholder={common.labels.email}
            autoFocus
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className="reset-button"
            htmlType="submit"
            loading={false}
            ghost
          >
            {common.labels.reset_password}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
