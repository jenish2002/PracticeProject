import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Auth, GoogleAuthProvider, getAuth } from "firebase/auth";
import { firebaseApp } from "../../config/firebase-config";
import { Firestore, getFirestore } from "firebase/firestore";
import Cookies from "js-cookie";

import { useGetUser } from "../../apis";

interface IAuthContext {
  auth: Auth;
  authProvider: GoogleAuthProvider;
  database: Firestore;
  user: IUserDetails | undefined;
  userLoggedIn: boolean;
  authLoading: boolean;
}

interface IAuthContextProvider {
  children?: ReactNode;
}

interface IUserDetails {
  id: string;
  name: string | null;
  email: string | null;
  profileIconUrl: string | null;
}

export const useAuth = () => useContext(AuthContext);

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC<IAuthContextProvider> = ({
  children,
}) => {
  const auth: Auth = getAuth(firebaseApp);
  const authProvider = new GoogleAuthProvider();
  const database: Firestore = getFirestore(firebaseApp);

  const [userDetails, setUserDetails] = useState<IUserDetails>();

  const getUser = useGetUser(auth);

  useEffect(() => {
    if (getUser.isSuccess && getUser.data) {
      const user = getUser.data;

      setUserDetails({
        id: user?.uid,
        name: user?.displayName || user?.email?.split("@")[0] || null,
        email: user?.email,
        profileIconUrl: user?.photoURL,
      });
    }
  }, [getUser.isSuccess, getUser.data]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        authProvider,
        database,
        user: userDetails,
        userLoggedIn: Cookies.get("userLoggedIn") === "true",
        authLoading: getUser.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
