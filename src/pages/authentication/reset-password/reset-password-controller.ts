import { useForm } from "antd/es/form/Form";
import {
  common,
  displayNotification,
  makeCustomMessage,
} from "../../../utills";
import { useNavigate } from "react-router-dom";

interface IResetPasswordFormValue {
  password: string;
  confirmPassword: string;
}

const useResetPasswordController = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = (values: IResetPasswordFormValue) => {
    values.password = values.password.trim();
    values.confirmPassword = values.confirmPassword.trim();

    if (values.password.length === 0) {
      form.setFields([
        {
          name: "password",
          errors: [common.messages.not_valid_information],
        },
      ]);
    } else if (values.password.length < 8) {
      form.setFields([
        {
          name: "password",
          errors: [
            makeCustomMessage(
              common.labels.password,
              common.messages.password_length
            ),
          ],
        },
      ]);
    } else if (values.password !== values.confirmPassword) {
      form.setFields([
        {
          name: "confirmPassword",
          errors: [common.messages.password_not_same],
        },
      ]);
    }

    if (
      !form.getFieldError("password").length &&
      !form.getFieldError("confirmPassword").length &&
      values.password === values.confirmPassword
    ) {
      displayNotification("success", common.messages.reset_password_successful);
      navigate("/login");
    }
  };

  return { form, onFinish };
};

export default useResetPasswordController;
