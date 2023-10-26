import { useForm } from "antd/es/form/Form";

import {
  EMAIL_REGEX,
  common,
  displayNotification,
  makeCustomMessage,
} from "../../../utills";
import { useNavigate } from "react-router-dom";

interface ILoginFormValue {
  email: string;
  password: string;
}

const useForgotPasswordController = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = (values: ILoginFormValue) => {
    values.email = values.email.trim();

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

    if (!form.getFieldError("email").length) {
      displayNotification("success", common.messages.email_sent_successful);
      navigate(-1);
    }
  };

  return { form, onFinish };
};

export default useForgotPasswordController;
