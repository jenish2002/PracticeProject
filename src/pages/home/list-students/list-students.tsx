import { Table } from "antd";

import Header from "./list-students-header";
import useListStudentController from "./list-students-controller";

const ListStudent: React.FC = () => {
  const { columns, columnData, onClickAddStudent } = useListStudentController();

  return (
    <div>
      <Header onClickAddStudent={onClickAddStudent} />
      <Table
        className="antd-table-main"
        rowKey="id"
        showHeader={true}
        columns={columns}
        dataSource={columnData}
        pagination={false}
      />
    </div>
  );
};

export default ListStudent;
