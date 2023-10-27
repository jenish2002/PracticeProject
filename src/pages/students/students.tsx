import { Route, Routes } from "react-router-dom";

import { Sidebar } from "../../components";
import ListStudent from "./list-students";
import AddStudent from "./add-students";
import useStudentsController from "./students-controller";

const Students: React.FC = () => {
  useStudentsController();

  return (
    <div className="students-main">
      <Sidebar>
        <Routes>
          <Route index element={<ListStudent />} />
          <Route path="add-student" element={<AddStudent />} />
        </Routes>
      </Sidebar>
    </div>
  );
};

export default Students;
