import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import {
  EMAIL_REGEX,
  QUERY_KEY,
  common,
  displayNotification,
  makeCustomMessage,
} from "../../../utills";
import { useAuth } from "../../../context";
import { ILoginFormValue } from "../../../types";
import { useVerifyUser } from "./services";
import { queryClient } from "../../../query-client";

const useLoginController = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const auth = useAuth();

  const verifyUser = useVerifyUser();

  const signInWithGoogle = () => {
    if (auth) {
      verifyUser.mutate({
        auth: auth?.auth,
        authProvider: auth?.authProvider,
      });
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
      verifyUser.mutate({
        auth: auth?.auth,
        email: values.email,
        password: values.password,
      });
    }
  };

  useEffect(() => {
    if (verifyUser.isSuccess) {
      Cookies.set("userLoggedIn", "true", {
        secure: true,
        path: "/",
        expires: new Date(Date.now() + 1000 * 3600 * 24),
      });
      queryClient.refetchQueries({ queryKey: [QUERY_KEY.GET_USER] });
      displayNotification("success", common.messages.login_successful);
      navigate("/students", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyUser.isSuccess]);

  useEffect(() => {
    if (verifyUser.isError) {
      Cookies.remove("userLoggedIn");

      switch (verifyUser.error.code) {
        case "auth/invalid-login-credentials":
          displayNotification("error", common.messages.invalid_credentials);
          break;
        case "auth/user-disabled":
          displayNotification("error", common.messages.account_blocked);
          break;
        default:
          console.error(verifyUser.error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyUser.isError]);

  return {
    form,
    isLoading: verifyUser.isPending,
    onFinish,
    signInWithGoogle: signInWithGoogle,
  };
};

export default useLoginController;
