import { common, onMenuClose } from "../../utills";
import { useAuth } from "../../context/auth-context";
import { Skeleton, Avatar } from "antd";

import { MenuIcon } from "../../icons/menu-icon";

const Header: React.FC = () => {
  const auth = useAuth();

  return (
    <div className="header">
      <div className="header-title">
        <span className="menu-icon" onClick={onMenuClose}>
          <MenuIcon />
        </span>
        <div className="title">{common.labels.home}</div>
      </div>
      <div>
        {auth?.authLoading ? (
          <Skeleton.Avatar active={true} size="large" />
        ) : auth?.user?.profileIcon ? (
          <img
            className="profile-icon"
            src={auth?.user?.profileIcon}
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
    </div>
  );
};

export default Header;
