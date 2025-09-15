export interface IUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  address?: string;
  password: string;
  phoneNumber?: string;
  username: string;
  role: "user" | "admin" | "operator";
}

export type AuthType = "register" | "login" | "logout";
