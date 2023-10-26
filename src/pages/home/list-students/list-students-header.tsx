import { common, onMenuOpenClose } from "../../../utills";
import { Button } from "antd";

import { MenuIcon } from "../../../icons/menu-icon";
import { PlusOutlined } from "@ant-design/icons";

interface IListStudentHeader {
  onClickAddStudent: () => void;
}

const ListStudentHeader: React.FC<IListStudentHeader> = ({
  onClickAddStudent,
}) => {
  return (
    <div className="header">
      <div className="header-title">
        <span className="menu-icon" onClick={onMenuOpenClose}>
          <MenuIcon />
        </span>
        <div className="title">{common.labels.home}</div>
      </div>
      <Button
        className="antd-button"
        type="primary"
        icon={<PlusOutlined className="antd-icon" />}
        onClick={onClickAddStudent}
      >
        {common.labels.add_student}
      </Button>
    </div>
  );
};

export default ListStudentHeader;
