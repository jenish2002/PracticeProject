import { Table } from "antd";
import Sidebar from "../../components/sidebar";
import Header from "./header";
import useHomeController from "./home-controller";

const Home: React.FC = () => {
  const { columns, columnData } = useHomeController();

  return (
    <div className="home-main">
      <Sidebar>
        <div>
          <Header />
          <div className="antd-table-main">
            <Table
              rowKey="id"
              showHeader={true}
              columns={columns}
              dataSource={columnData}
              pagination={false}
            />
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default Home;
