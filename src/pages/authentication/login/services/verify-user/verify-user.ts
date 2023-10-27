import { useMutation } from "@tanstack/react-query";
import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { MUTATION_KEY } from "../../../../../utills";
import { IFirebaseError } from "../../../../../types";

interface IUserDetails {
  auth: Auth;
  authProvider?: GoogleAuthProvider;
  email?: string;
  password?: string;
}

const verifyUser = async (userDetails: IUserDetails) => {
  if (userDetails.authProvider) {
    await signInWithPopup(userDetails.auth, userDetails.authProvider);

    return true;
  } else {
    await signInWithEmailAndPassword(
      userDetails.auth,
      userDetails.email || "",
      userDetails.password || ""
    );

    return true;
  }
};

const useVerifyUser = () =>
  useMutation<boolean, IFirebaseError, IUserDetails>({
    mutationKey: [MUTATION_KEY.VERIFY_USER],
    mutationFn: (userDetails: IUserDetails) => verifyUser(userDetails),
  });

export default useVerifyUser;
