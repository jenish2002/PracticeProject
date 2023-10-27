import { Avatar, Layout, Menu, Skeleton } from "antd";

import useSidebarController from "./sidebar-controller";
import { MENU_ITEMS_KEY, capitalizeFirstLetter } from "../../utills";

interface ISidebar {
  children: React.ReactNode;
}

const { Sider } = Layout;

const Sidebar: React.FC<ISidebar> = ({ children }) => {
  const {
    authIsLoding,
    authUser,
    userIcon,
    isSidebarOpen,
    sidebarSelectedItemKey,
    onClickMenuItem,
  } = useSidebarController();

  return (
    <Layout className="sidebar-main">
      <Sider
        className={`sidebar-inner ${isSidebarOpen ? "open-sidebar" : ""}`}
        trigger={null}
        theme="light"
      >
        <div className="profile-icon-outer">
          {authIsLoding ? (
            <>
              <Skeleton.Avatar
                className="profile-icon-skeleton"
                style={{ width: "90px", height: "90px" }}
                active={true}
                size="large"
              />
              <div className="profile-name-skeleton">
                <Skeleton.Input active={true} size="small" block={true} />
                <Skeleton.Input active={true} size="small" block={true} />
              </div>
            </>
          ) : (
            <>
              {authUser?.profileIconUrl ? (
                <img
                  className="profile-icon"
                  src={authUser?.profileIconUrl}
                  alt=""
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Avatar
                  className="profile-icon-default"
                  shape="circle"
                  size="large"
                  icon={userIcon}
                />
              )}
              <div className="profile-name">
                <span className="profile-text margin-bottom-6">
                  {capitalizeFirstLetter(authUser?.name)}
                </span>
                <span className="profile-text gray-text">
                  {capitalizeFirstLetter(authUser?.email)}
                </span>
              </div>
            </>
          )}
        </div>
        <Menu
          className="antd-menu"
          mode="inline"
          selectedKeys={[sidebarSelectedItemKey]}
          onClick={onClickMenuItem}
          items={[
            {
              key: MENU_ITEMS_KEY.STUDENTS,
              label: "Students",
            },
            {
              key: MENU_ITEMS_KEY.LOGOUT,
              label: "Logout",
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
