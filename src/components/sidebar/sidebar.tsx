import { Avatar, Layout, Menu, Skeleton } from "antd";
import useSidebarController from "./sidebar-controller";

interface ISidebar {
  children: React.ReactNode;
}

const { Sider } = Layout;

const Sidebar: React.FC<ISidebar> = ({ children }) => {
  const { authIsLoding, authUser, userIcon, isSidebarOpen, onClickMenuItem } =
    useSidebarController();

  return (
    <Layout className="sidebar-main">
      <Sider
        className={`sidebar-inner ${isSidebarOpen ? "open-sidebar" : ""}`}
        trigger={null}
        theme="light"
      >
        <div className="profile-icon-outer">
          {authIsLoding ? (
            <Skeleton.Avatar active={true} size="large" />
          ) : authUser?.profileIconUrl ? (
            <img
              className="profile-icon"
              src={authUser?.profileIconUrl}
              alt=""
              referrerPolicy="no-referrer"
            />
          ) : (
            <Avatar
              className="profile-icon"
              shape="circle"
              size="large"
              icon={userIcon}
            />
          )}
          <div className="profile-name">
            <span className="profile-text margin-bottom-4">
              {authUser?.name}
            </span>
            <span className="profile-text gray-text">{authUser?.email}</span>
          </div>
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
      <div className={`sidebar-children ${isSidebarOpen ? "" : "no-sidebar"}`}>
        {children}
      </div>
    </Layout>
  );
};

export default Sidebar;
