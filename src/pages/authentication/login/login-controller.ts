import { useForm } from "antd/es/form/Form";
import {
  EMAIL_REGEX,
  common,
  displayNotification,
  makeCustomMessage,
} from "../../../utills";

interface ILoginFormValue {
  email: string;
  password: string;
}

const useLoginController = () => {
  const [form] = useForm();

  const onFinish = (values: ILoginFormValue) => {
    values.email = values.email.trim();
    values.password = values.password.trim();

    if (values.email.length === 0) {
      form.setFields([
        { name: "email", errors: [common.messages.not_valid_information] },
      ]);
    } else if (values.email.length < 3 || !EMAIL_REGEX.test(values.email)) {
      form.setFields([
        {
          name: "email",
          errors: [
            makeCustomMessage(common.labels.email, common.messages.not_valid),
          ],
        },
      ]);
    }

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
    }

    if (
      !form.getFieldError("email").length &&
      !form.getFieldError("password").length
    ) {
      displayNotification("success", common.messages.login_successful);
    }
  };

  return { form, onFinish };
};

export default useLoginController;
