import { Resolver } from "type-graphql";
import { User } from "../entities/user";

@Resolver(User)
export class UserResolver {}
