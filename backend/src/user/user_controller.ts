import * as User from "../models/user_model";

export const getUserById = (id: string) => {
  return User.getUserById(id);
}

export const signIn = () => {
  return User.signIn();
}
