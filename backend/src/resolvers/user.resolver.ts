import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";
import * as AuthService from "../services/auth.service";
import * as UserService from "../services/user.service";

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  getUserByEmail(@Arg("email") email: string): Promise<User | null> {
    return UserService.getByEmail(email);
  }

  @Mutation(() => User)
  createUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("firstname") firstname?: string,
    @Arg("lastname") lastname?: string
  ): Promise<User> {
    return UserService.createUser(email, password, firstname, lastname);
  }

  @Mutation(() => String)
  signIn(@Arg("email") email: string, @Arg("password") password: string) {
    return AuthService.signIn(email, password);
  }

  @Authorized()
  @Query(() => User)
  getMe(@Arg("token") token: string): Promise<User | null> {
    return AuthService.getMe(token);
  }

  @Authorized()
  @Mutation(() => String)
  async updateUser(
    @Ctx("user") user: User,
    @Arg("email", { nullable: true }) email?: string,
    @Arg("firstname", { nullable: true }) firstname?: string,
    @Arg("lastname", { nullable: true }) lastname?: string,
    @Arg("password", { nullable: true }) password?: string,
    @Arg("newPassword", { nullable: true }) newPassword?: string
  ) {
    try {
      const userToUpdate = await UserService.getByEmail(user.email);
      if (userToUpdate) {
        return await UserService.updateUser(
          user,
          email,
          firstname,
          lastname,
          password,
          newPassword
        );
      }
    } catch (error) {
      throw error;
    }
  }

  @Authorized()
  @Mutation(() => String)
  async deleteUser(@Ctx("user") user: User) {
    const userToDelete = await UserService.getByEmail(user.email);
    if (userToDelete) {
      await UserService.deleteUser(user.email);
    }
    return "OK";
  }
}

