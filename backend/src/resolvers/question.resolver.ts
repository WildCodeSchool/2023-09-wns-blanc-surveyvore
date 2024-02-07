import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Question } from "../entities/question";
import * as QuestionService from "../services/question.service";
import { CreateQuestionInputType } from "../types/CreateQuestionInputType";

@Resolver()
export class QuestionResolver {
  @Query(() => [Question])
  getQuestionsBySurveyId(
    @Arg("surveyId") surveyId: string
  ): Promise<Question[]> {
    return QuestionService.getQuestionsBySurveyId(surveyId);
  }

  @Mutation(() => Question)
  async createQuestion(
    @Arg("surveyId") surveyId: string,
    @Arg("question") question: CreateQuestionInputType
  ): Promise<Question> {
    return QuestionService.createQuestion({ ...question, surveyId });
  }

  @Mutation(() => Question)
  async editQuestion(
    @Arg("id") id: string,
    @Arg("question") question: CreateQuestionInputType
  ): Promise<Question | undefined> {
    return QuestionService.editQuestion(id, {
      ...question,
    } as Question);
  }

  @Mutation(() => Boolean)
  async deleteQuestion(@Arg("id") id: string): Promise<string> {
    await QuestionService.deleteQuestion(id);

    return "OK";
  }
}

