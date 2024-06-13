import jwt from "jsonwebtoken";
import * as UserService from "./user.service";
import * as argon2 from "argon2";
import { Payload } from "../types/PayloadType";

/**
 * Return the token payload from the token in parameter.
 * @param token token to verify
 * @returns
 */
export function verifyToken(token: string) {
  if (process.env.JWT_SECRET_KEY === undefined) {
    throw new Error();
  }

  return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

export async function signIn(email: string, password: string): Promise<string> {
  try {
    // Récupérer l'utilisateur dans la bdd suivant l'email
    const userFromDB = await UserService.getByEmail(email);

    if (!userFromDB) {
      throw new Error("UserNot found!");
    }
    // Vérifier que ce sont les même mots de passe
    if (await verifyPassword(password, userFromDB.password)) {
      const payload: Payload = {
        email: userFromDB.email,
        role: userFromDB.role,
        id: userFromDB.id,
      };
      // Créer un nouveau token => signer un token
      const token = signJwt(payload);
      // Renvoyer le token
      return token;
    }
    throw new Error("Invalid Auth");
  } catch (e) {
    throw e;
  }
}

/**
 * Return true if the password in parameter is the same as the hashed password in parameter as well.
 * @param password password
 * @param hashedPassword hashed password
 * @returns
 */
export async function verifyPassword(password: string, hashedPassword: string) {
  return await argon2.verify(hashedPassword, password);
}

/**
 * Return a signed payload.
 * @param payload payload to sign
 * @returns
 */
export function signJwt(payload: any) {
  if (process.env.JWT_SECRET_KEY === undefined) {
    throw new Error();
  }

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
}

export function getMe(token: string) {
  const payload = verifyToken(token) as Payload;

  const user = UserService.getByEmail(payload.email);
  return user;
}

