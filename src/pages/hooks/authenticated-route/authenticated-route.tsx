import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../../context";

interface IUseAuthenticatedRoute {
  children: React.ReactNode;
}

export const AuthenticatedRoute: React.FC<IUseAuthenticatedRoute> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = useAuth();

  useEffect(() => {
    if (
      !auth?.userLoggedIn &&
      !pathname.includes("forgot-password") &&
      !pathname.includes("reset-password")
    ) {
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.userLoggedIn]);

  return <>{children}</>;
};

export default AuthenticatedRoute;
