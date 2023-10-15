import {
  Auth,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseApp } from "../../config/firebase-config";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

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
  profileIcon: string;
}

export const useAuth = () => useContext(AuthContext);

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC<IAuthContextProvider> = ({
  children,
}) => {
  const auth = getAuth(firebaseApp);
  const authProvider = new GoogleAuthProvider();

  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<IUserDetails>();

  useEffect(() => {
    setAuthLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserDetails({
          name: user?.displayName || "",
          email: user?.email || "",
          profileIcon: user?.photoURL || "",
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userDetails) {
      setAuthLoading(false);
    }
  }, [userDetails]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        authProvider,
        user: userDetails,
        userLoggedIn: Cookies.get("userLoggedIn") === "true",
        authLoading: authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
