import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";

import { useAddStudent } from "../services";
import { common, displayNotification } from "../../../utills";
import { useAuth } from "../../../context";
import { IAddStudentFormData } from "../../../types";

const useAddStudentController = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const auth = useAuth();

  const addStudent = useAddStudent(auth?.database);

  const onFinish = async () => {
    try {
      const values: IAddStudentFormData = await form.validateFields();

      addStudent.mutate(values);
    } catch {
      displayNotification("error", common.messages.please_provide_all_details);
    }
  };

  const onClickBack = () => {
    navigate("/home", { replace: true });
  };

  useEffect(() => {
    if (addStudent.isSuccess) {
      displayNotification(
        "success",
        common.messages.student_added_successfully
      );
      onClickBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addStudent.isSuccess]);

  return {
    form,
    addStudentIsLoading: addStudent.isPending,
    onFinish,
    onClickBack,
  };
};

export default useAddStudentController;
