import Bcrypt from "bcrypt";

export const securePassword = async (password: string) => {
  return await Bcrypt.hash(password, 10);
};

export const matchPassword = async ( enteredPassword: string,storedPassword: string):Promise<boolean> => {
  return await Bcrypt.compare(enteredPassword, storedPassword);
};
