import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context";
import { useLogoutUser } from "../../apis";
import { capitalizeFirstLetter } from "../../utills";

const useSidebarController = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = useAuth();

  const logoutUser = useLogoutUser();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarSelectedItemKey, setSidebarSelectedItemKey] = useState("");

  const onClickMenuItem = async (e: { key: string }) => {
    if (auth) {
      switch (e.key) {
        case "student":
          navigate("/students", { replace: pathname.includes("/students") });
          break;
        case "logout":
          logoutUser.mutate(auth?.auth);
          break;
        default:
          break;
      }
      setSidebarSelectedItemKey(e.key);
    }
  };

  const changeSidebarSelectedItemKey = (event: CustomEvent) => {
    setSidebarSelectedItemKey(event.detail);
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
    document.addEventListener(
      "onChangeSidebarSelectedItem",
      changeSidebarSelectedItemKey as EventListener
    );

    return () => {
      document.removeEventListener("onSidebarOpenClose", sidebarOpenClose);
      document.removeEventListener("onSidebarClose", sidebarClose);
      document.removeEventListener(
        "onChangeSidebarSelectedItem",
        changeSidebarSelectedItemKey as EventListener
      );
    };
  }, [isSidebarOpen]);

  return {
    authIsLoding: auth?.authLoading,
    authUser: auth?.user,
    userIcon: capitalizeFirstLetter(auth?.user?.email?.slice(0, 1)),
    isSidebarOpen,
    sidebarSelectedItemKey,
    onClickMenuItem,
  };
};

export default useSidebarController;
