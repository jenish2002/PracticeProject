import { Layout, Menu } from "antd";
import useSidebarController from "./sidebar-controller";

interface ISidebar {
  children: React.ReactNode;
}

const { Sider } = Layout;

const Sidebar: React.FC<ISidebar> = ({ children }) => {
  const { isSidebarOpen, onClickMenuItem } = useSidebarController();

  return (
    <Layout className="sidebar-main">
      <Sider
        className={isSidebarOpen ? "" : "close-sidebar"}
        trigger={null}
        theme="light"
      >
        <Menu
          className="antd-menu"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={onClickMenuItem}
          items={[
            {
              key: "1",
              label: "nav 1",
            },
            {
              key: "2",
              label: "nav 2",
            },
            {
              key: "3",
              label: "nav 3",
            },
            {
              key: "logout",
              label: "Logout",
              onClick: onClickMenuItem,
            },
          ]}
        />
      </Sider>
      {children}
    </Layout>
  );
};

export default Sidebar;
