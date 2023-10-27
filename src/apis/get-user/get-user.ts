import { useQuery } from "@tanstack/react-query";
import { Auth, User, onAuthStateChanged } from "firebase/auth";

import { QUERY_KEY } from "../../utills";

const getUser = async (auth: Auth) => {
  const response: User | null = await new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      user ? resolve(user) : reject(undefined);
    });
  });

  return response;
};

export const useGetUser = (auth: Auth) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_USER],
    queryFn: () => getUser(auth),
  });

export default useGetUser;
