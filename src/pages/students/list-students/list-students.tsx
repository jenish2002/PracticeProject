import { Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import Header from "./list-students-header";
import useListStudentController from "./list-students-controller";
import { common } from "../../../utills";

const ListStudent: React.FC = () => {
  const {
    columns,
    columnData,
    totalRecoords,
    getStudentsIsLoading,
    getStudentsIsFetching,
    onClickAddStudent,
    onChangeSearch,
  } = useListStudentController();

  return (
    <div>
      <Header onClickAddStudent={onClickAddStudent} />
      <div className="search">
        <Input
          className="search-textbox"
          placeholder={common.labels.search}
          prefix={<SearchOutlined className="antd-icon" />}
          onChange={(e) => onChangeSearch(e?.target?.value)}
        />
        <span className="gray-text">{`${totalRecoords} ${common.labels.records}`}</span>
      </div>
      <Table
        className="antd-table-main"
        rowKey="id"
        showHeader={true}
        columns={columns}
        dataSource={columnData}
        pagination={false}
        loading={getStudentsIsLoading || getStudentsIsFetching}
      />
    </div>
  );
};

export default ListStudent;
