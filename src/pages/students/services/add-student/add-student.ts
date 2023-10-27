import { useMutation } from "@tanstack/react-query";
import { collection, addDoc, Firestore } from "firebase/firestore";

import { MUTATION_KEY } from "../../../../utills";
import { IAddStudentFormData, IFirebaseError } from "../../../../types";

const addStudent = async (
  database: Firestore | undefined,
  student: IAddStudentFormData
) => {
  if (database) {
    const response = await addDoc(collection(database, "students"), student);

    return response?.id;
  }
};

const useAddStudent = (database?: Firestore) =>
  useMutation<string | undefined, IFirebaseError, IAddStudentFormData>({
    mutationKey: [MUTATION_KEY.ADD_STUDENT],
    mutationFn: (student: IAddStudentFormData) => addStudent(database, student),
  });

export default useAddStudent;
