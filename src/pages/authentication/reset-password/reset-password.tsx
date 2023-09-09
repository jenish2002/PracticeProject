import { Button, Form } from "antd";
import useResetPasswordController from "./reset-password-controller";
import { common, makeCustomMessage } from "../../../utills";

import { LockOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import Password from "antd/es/input/Password";

const ResetPassword: React.FC = () => {
  const { form, onFinish } = useResetPasswordController();

  return (
    <div className="center-and-middle">
      <Form className="login-form" form={form} onFinish={onFinish}>
        <div className="big-text large-font-size">
          {common.labels.reset_password}
        </div>
        <Form.Item
          name="password"
          className="form-item-textbox"
          rules={[
            {
              required: true,
              message: makeCustomMessage(
                common.labels.new_password,
                common.messages.required
              ),
            },
          ]}
        >
          <Password
            prefix={<LockOutlined className="antd-icon" />}
            placeholder={common.labels.new_password}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          className="form-item-textbox"
          rules={[
            {
              required: true,
              message: makeCustomMessage(
                common.labels.confirm_password,
                common.messages.required
              ),
            },
          ]}
        >
          <Password
            prefix={<SafetyCertificateOutlined className="antd-icon" />}
            placeholder={common.labels.confirm_password}
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

export default ResetPassword;
