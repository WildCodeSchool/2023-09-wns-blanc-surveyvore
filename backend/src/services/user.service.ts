import { User } from "../entities/user";
import * as argon2 from "argon2";

export async function create(
  email: string,
  password: string,
  firstname?: string,
  lastname?: string
): Promise<User> {
  const newUser = new User();
  newUser.email = email;
  newUser.hashedPassword = await argon2.hash(password);
  newUser.firstname = firstname;
  newUser.lastname = lastname;
  newUser.roleId = "USER";

  return newUser.save();
}

export function getByEmail(email: string): Promise<User | null> {
  return User.findOne({
    where: { email },
  });
}
