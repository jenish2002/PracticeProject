import { useMutation } from "@tanstack/react-query";
import { Auth, signOut } from "firebase/auth";

import { MUTATION_KEY } from "../../utills/enums";

const logoutUser = async (auth: Auth) => {
  return await signOut(auth);
};

export const useLogoutUser = () =>
  useMutation({
    mutationKey: [MUTATION_KEY.LOGOUT_USER],
    mutationFn: (auth: Auth) => logoutUser(auth),
  });

export default useLogoutUser;
