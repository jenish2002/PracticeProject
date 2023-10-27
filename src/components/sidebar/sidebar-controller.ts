import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { useLogoutUser } from "../../apis";

const useSidebarController = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const logoutUser = useLogoutUser();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const onClickMenuItem = async (e: { key: string }) => {
    if (e.key === "logout" && auth) {
      logoutUser.mutate(auth?.auth);
    }
  };

  useEffect(() => {
    if (logoutUser.isSuccess) {
      Cookies.remove("userLoggedIn");
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutUser.isSuccess]);

  useEffect(() => {
    if (logoutUser.isError) {
      console.error(logoutUser.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutUser.isError]);

  useEffect(() => {
    const sidebarOpenClose = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    const sidebarClose = () => {
      setIsSidebarOpen(false);
    };

    document.addEventListener("onSidebarOpenClose", sidebarOpenClose);
    document.addEventListener("onSidebarClose", sidebarClose);

    return () => {
      document.removeEventListener("onSidebarOpenClose", sidebarOpenClose);
      document.removeEventListener("onSidebarClose", sidebarClose);
    };
  }, [isSidebarOpen]);

  return {
    authIsLoding: auth?.authLoading,
    authUser: auth?.user,
    userIcon: auth?.user?.email?.slice(0, 1).toLocaleUpperCase(),
    isSidebarOpen,
    onClickMenuItem,
  };
};

export default useSidebarController;
