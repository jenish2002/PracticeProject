import { useForm } from "antd/es/form/Form";
import {
  EMAIL_REGEX,
  common,
  displayNotification,
  makeCustomMessage,
} from "../../../utills";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import { useAuth } from "../../../context/auth-context";

interface ILoginFormValue {
  email: string;
  password: string;
}

const useLoginController = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const auth = useAuth();

  const onLoginSuccessful = () => {
    Cookies.set("userLoggedIn", "true", {
      secure: true,
      path: "/",
      expires: new Date(Date.now() + 1000 * 3600 * 24),
    });
    displayNotification("success", common.messages.login_successful);
    navigate("/home", { replace: true });
  };

  const signInWithGoogle = () => {
    try {
      if (auth) {
        signInWithPopup(auth?.auth, auth?.authProvider).then(onLoginSuccessful);
      }
    } catch (error) {
      Cookies.remove("userLoggedIn");
      console.error(error);
    }
  };

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
      !form.getFieldError("password").length &&
      auth
    ) {
      signInWithEmailAndPassword(auth?.auth, values.email, values.password)
        .then(onLoginSuccessful)
        .catch((err) => {
          switch (err.code) {
            case "auth/invalid-login-credentials":
              displayNotification("error", common.messages.invalid_credentials);
              break;
            case "auth/user-disabled":
              displayNotification("error", common.messages.account_blocked);
              break;
            default:
              console.error(err);
          }
        });
    }
  };

  return { form, onFinish, signInWithGoogle: signInWithGoogle };
};

export default useLoginController;
