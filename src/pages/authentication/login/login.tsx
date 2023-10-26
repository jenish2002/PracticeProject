import { Button, Divider, Form, Input } from "antd";
import Password from "antd/es/input/Password";
import useLoginController from "./login-controller";
import { common, makeCustomMessage } from "../../../utills";
import Link from "antd/es/typography/Link";

import { GoogleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

const Login: React.FC = () => {
  const { form, isLoading, onFinish, signInWithGoogle } = useLoginController();

  return (
    <div className="flex-center-and-middle">
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
        <div className="flex-end margin-top-8">
          <Link href="/forgot-password">{common.labels.forgot_password}?</Link>
        </div>
        <Form.Item>
          <Button
            type="primary"
            className="login-button"
            htmlType="submit"
            loading={isLoading}
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
            onClick={signInWithGoogle}
          >
            {common.labels.sign_in_with_google}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
