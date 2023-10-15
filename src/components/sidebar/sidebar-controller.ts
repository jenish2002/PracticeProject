import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const useSidebarController = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const onClickMenuItem = async (e: { key: string }) => {
    if (e.key === "logout") {
      try {
        if (auth) {
          await signOut(auth?.auth);
          Cookies.remove("userLoggedIn");
          navigate("/login", { replace: true });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const sidebarOpenClose = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    document.addEventListener("onSidebarOpenClose", sidebarOpenClose);

    return () => {
      document.removeEventListener("onSidebarOpenClose", sidebarOpenClose);
    };
  }, [isSidebarOpen]);

  return { isSidebarOpen, onClickMenuItem };
};

export default useSidebarController;
