import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";
import * as AuthService from "../services/auth.service";

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  helloWorld() {
    return "Hello World!";
  }
}
