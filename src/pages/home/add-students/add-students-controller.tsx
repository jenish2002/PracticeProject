import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";

const useAddStudentController = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = () => {};

  const onClickBack = () => {
    navigate("/home", { replace: true });
  };

  return { form, onFinish, onClickBack };
};

export default useAddStudentController;
