import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { QUERY_KEY } from "../../../../utills";

const getStudents = async (database: Firestore | undefined, search: string) => {
  if (database) {
    const response = search
      ? await getDocs(
          query(collection(database, "students"), where("name", ">=", search))
        )
      : await getDocs(collection(database, "students"));

    return response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
};

const useGetStudents = (database: Firestore | undefined, search: string) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_STUDENTS, search],
    queryFn: () => getStudents(database, search),
    placeholderData: keepPreviousData,
  });

export default useGetStudents;
