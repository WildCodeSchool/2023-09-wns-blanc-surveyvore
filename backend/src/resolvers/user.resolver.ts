import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";
import * as AuthService from "../services/auth.service";
import * as UserService from "../services/user.service";

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  helloWorld() {
    return "Hello World!";
  }

  @Mutation(() => User)
  createUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("firstname") firstname?: string,
    @Arg("lastname") lastname?: string
  ): Promise<User> {
    return UserService.create(email, password, firstname, lastname);
  }
}
