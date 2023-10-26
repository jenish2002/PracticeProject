import { useQuery } from "@tanstack/react-query";
import { Auth, User, onAuthStateChanged } from "firebase/auth";

import { QUERY_KEY } from "../../utills/enums";

const getUser = (auth: Auth) => {
  let response: User | undefined;

  onAuthStateChanged(auth, (user) => {
    response = user || undefined;
  });

  return response;
};

export const useGetUser = (auth: any) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_USER],
    queryFn: () => getUser(auth),
  });

export default useGetUser;
