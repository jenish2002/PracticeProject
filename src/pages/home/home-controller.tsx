import { useMemo } from "react";

const useHomeController = () => {
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

  return { columns, columnData };
};

export default useHomeController;
