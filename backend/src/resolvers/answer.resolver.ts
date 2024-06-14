import { Arg, Mutation, Resolver } from "type-graphql";
import { UserAnswer } from "../entities/userAnswer";
import * as AnswerService from "../services/answer.service";

@Resolver()
export class AnswerResolver {
  @Mutation(() => UserAnswer)
  createAnswer(
    @Arg("content") content: string,
    @Arg("question") question: string,
    @Arg("answer") answer: string,
    @Arg("user") user: string
  ): Promise<UserAnswer> {
    return AnswerService.addAnswer({ content, question, answer, user });
  }
}
