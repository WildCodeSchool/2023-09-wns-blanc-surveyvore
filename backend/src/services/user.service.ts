import { DeleteResult } from "typeorm";
import { Role } from "../entities/role";
import { User } from "../entities/user";
import * as argon2 from "argon2";

export async function createUser(
  email: string,
  password: string,
  firstname?: string,
  lastname?: string
): Promise<User> {
  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser) {
    throw new Error("This mail is already used");
  }
  const newUser = new User();
  newUser.email = email;
  newUser.password = await argon2.hash(password);
  newUser.firstname = firstname || "";
  newUser.lastname = lastname || "";
  const role = await Role.findOneBy({ name: "USER" });
  if (role) {
    newUser.role = role;
  }

  return newUser.save();
}

export function getByEmail(email: string): Promise<User | null> {
  return User.findOne({
    where: { email },
    relations: {
      surveys: true,
      role: true,
    },
  });
}

export function deleteUser(email: string): Promise<DeleteResult> {
  return User.delete({ email: email });
}

export function getByEmailWithoutData(email: string): Promise<User | null> {
  return User.findOne({ where: { email } });
}
