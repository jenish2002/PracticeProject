import { Avatar, Layout, Menu, Skeleton } from "antd";
import useSidebarController from "./sidebar-controller";

interface ISidebar {
  children: React.ReactNode;
}

const { Sider } = Layout;

const Sidebar: React.FC<ISidebar> = ({ children }) => {
  const { auth, isSidebarOpen, onClickMenuItem } = useSidebarController();

  return (
    <Layout className="sidebar-main">
      <Sider
        className={`sidebar-inner ${isSidebarOpen ? "" : "close-sidebar"}`}
        trigger={null}
        theme="light"
        collapsible
        collapsed={!isSidebarOpen}
      >
        <div>
          {auth?.authLoading ? (
            <Skeleton.Avatar active={true} size="large" />
          ) : auth?.user?.profileIconUrl ? (
            <img
              className="profile-icon"
              src={auth?.user?.profileIconUrl}
              alt=""
              referrerPolicy="no-referrer"
            />
          ) : (
            <Avatar
              className="profile-icon"
              shape="circle"
              size="large"
              icon="U"
            />
          )}
        </div>
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
      <div className="sidebar-children">{children}</div>
    </Layout>
  );
};

export default Sidebar;
