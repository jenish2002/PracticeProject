import { Auth, GoogleAuthProvider, getAuth } from "firebase/auth";
import { firebaseApp } from "../../config/firebase-config";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

import { useGetUser } from "../../apis";

interface IAuthContext {
  auth: Auth;
  authProvider: GoogleAuthProvider;
  user: IUserDetails | undefined;
  userLoggedIn: boolean;
  authLoading: boolean;
}

interface IAuthContextProvider {
  children?: ReactNode;
}

interface IUserDetails {
  name: string;
  email: string;
  profileIconUrl: string;
}

export const useAuth = () => useContext(AuthContext);

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC<IAuthContextProvider> = ({
  children,
}) => {
  const auth: Auth = getAuth(firebaseApp);
  const authProvider = new GoogleAuthProvider();

  const [userDetails, setUserDetails] = useState<IUserDetails>();

  const getUser = useGetUser(auth);

  useEffect(() => {
    if (getUser.isSuccess && getUser.data) {
      const user = getUser.data;

      setUserDetails({
        name: user?.displayName || "",
        email: user?.email || "",
        profileIconUrl: user?.photoURL || "",
      });
    }
  }, [getUser.isSuccess, getUser.data]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        authProvider,
        user: userDetails,
        userLoggedIn: Cookies.get("userLoggedIn") === "true",
        authLoading: getUser.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
