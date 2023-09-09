import { Button, Checkbox, Divider, Form, Input } from "antd";
import Password from "antd/es/input/Password";
import useLoginController from "./login-controller";
import { common, makeCustomMessage } from "../../../utills";

import { GoogleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";

const Login: React.FC = () => {
  const { form, onFinish } = useLoginController();

  return (
    <div className="center-and-middle">
      <Form className="login-form" form={form} onFinish={onFinish}>
        <div className="big-text">{common.labels.welcome}</div>
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
        <Form.Item
          name="password"
          className="form-item-textbox"
          rules={[
            {
              required: true,
              message: makeCustomMessage(
                common.labels.password,
                common.messages.required
              ),
            },
          ]}
        >
          <Password
            prefix={<LockOutlined className="antd-icon" />}
            placeholder={common.labels.password}
          />
        </Form.Item>
        <div className="flex-space-between margin-top-40">
          <Form.Item
            name="rememberMe"
            className="margin-bottom-0"
            valuePropName="checked"
          >
            <Checkbox defaultChecked={true} value={true}>
              {common.labels.remember_me}
            </Checkbox>
          </Form.Item>
          <Link href="/forgot-password">{common.labels.forgot_password}?</Link>
        </div>
        <Form.Item>
          <Button
            type="primary"
            className="login-button"
            htmlType="submit"
            loading={false}
          >
            {common.labels.login}
          </Button>
        </Form.Item>
        <Divider className="login-divider">{common.labels.or}</Divider>
        <Form.Item className="flex-center">
          <Button
            className="google-button"
            type="primary"
            shape="round"
            icon={<GoogleOutlined className="antd-icon antd-big-icon" />}
            size="large"
            ghost
          >
            {common.labels.sign_in_with_google}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
