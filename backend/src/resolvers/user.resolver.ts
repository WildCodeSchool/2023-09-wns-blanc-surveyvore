import { Arg, Mutation, Query, Resolver } from "type-graphql";
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
}
