import { Route, Routes } from "react-router-dom";

import { Sidebar } from "../../components";
import useHomeController from "./home-controller";
import ListStudent from "./list-students";
import AddStudent from "./add-students";

const Home: React.FC = () => {
  useHomeController();

  return (
    <div className="home-main">
      <Sidebar>
        <Routes>
          <Route index element={<ListStudent />} />
          <Route path="add-student" element={<AddStudent />} />
        </Routes>
      </Sidebar>
    </div>
  );
};

export default Home;
