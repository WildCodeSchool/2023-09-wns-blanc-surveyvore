import { DeleteResult } from "typeorm";
import { Role } from "../entities/role";
import { User } from "../entities/user";
import * as argon2 from "argon2";
import { verifyPassword, verifyToken } from "./auth.service";
import { Payload } from "../types/PayloadType";

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

export async function updateUser(
  user: User,
  newEmail?: string,
  firstname?: string,
  lastname?: string,
  password?: string,
  newPassword?: string
): Promise<User | null> {
  try {
    if (user) {
      user.firstname = firstname || user.firstname;
      user.lastname = lastname || user.lastname;

      if (newEmail && newEmail !== user.email) {
        const existingUser = await getByEmail(newEmail);
        if (existingUser) {
          throw new Error("L'email que vous avez renseigné est déjà utilisé!");
        }
        user.email = newEmail;
      }

      if (password) {
        const isMatch = await verifyPassword(password, user.password);
        if (!isMatch) {
          throw new Error(
            "L'ancien mot de passe est incorrect! Vous n'êtes pas autorisé à le modifier!"
          );
        }

        const isNewPasswordUnchanged = newPassword === password;

        if (isNewPasswordUnchanged) {
          throw new Error(
            "Le nouveau mot de passe est identique au mot de passe actuel"
          );
        }

        if (newPassword && !isNewPasswordUnchanged) {
          user.password = await argon2.hash(newPassword);
        }
      }

      return user.save();
    }
    throw new Error("Cet utilisateur n'existe pas");
  } catch (e) {
    throw e;
  }
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

