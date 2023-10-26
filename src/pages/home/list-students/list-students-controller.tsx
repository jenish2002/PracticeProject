import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { onMenuClose } from "../../../utills";

const useListStudentController = () => {
  const navigate = useNavigate();

  const onClickAddStudent = () => {
    setTimeout(onMenuClose, 0);
    navigate("add-student");
  };

  const columns = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        width: "4%",
        render: (name: string) => <>{name}</>,
      },
    ],
    []
  );

  const columnData = [
    { id: "1", name: "JP" },
    { id: "2", name: "JP2" },
    { id: "3", name: "JP3" },
  ];

  return { columns, columnData, onClickAddStudent };
};

export default useListStudentController;
