import { User } from "../models/user";

export const getUserById = (id: number) => {
  return User.findBy({ id: id });
}

export const signIn = () => {
  // return User.signIn();
}
