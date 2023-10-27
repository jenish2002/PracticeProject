export type NotificationType = "success" | "info" | "warning" | "error";

export interface ILoginFormValue {
  email: string;
  password: string;
}

export interface IFirebaseError {
  code: string;
  name: string;
}

export interface IAddStudentFormData {
  name: string;
}

export interface IGetStudentsResponse extends IAddStudentFormData {
  id: string;
}
