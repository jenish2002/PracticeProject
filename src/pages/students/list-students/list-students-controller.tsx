import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

import { onMenuClose } from "../../../utills";
import { useGetStudents } from "../services";
import { useAuth } from "../../../context";

const useListStudentController = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [search, setSearch] = useState("");

  const getStudents = useGetStudents(auth?.database, search);

  const onClickAddStudent = () => {
    setTimeout(onMenuClose, 0);
    navigate("add-student");
  };

  const onChangeSearch = debounce((value: string) => {
    setSearch(value);
  }, 500);

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

  return {
    columns,
    columnData: getStudents.data,
    totalRecoords: getStudents.data?.length || 0,
    getStudentsIsLoading: getStudents.isLoading,
    getStudentsIsFetching: getStudents.isFetching,
    onClickAddStudent,
    onChangeSearch,
  };
};

export default useListStudentController;
