import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Question } from "../entities/question";
import * as QuestionService from "../services/question.service";
import { CreateQuestionInputType } from "../types/CreateQuestionInputType";
import { EditQuestionInputType } from "../types/EditQuestionInputType";

@Resolver()
export class QuestionResolver {
    @Query(() => [Question])
    getQuestions(@Arg("surveyLink") surveyLink: string): Promise<Question[]> {
        return QuestionService.getQuestionsBySurveyLink(surveyLink);
    }

    @Mutation(() => Question)
    async createQuestion(
        @Arg("question") question: CreateQuestionInputType
    ): Promise<Question> {
        return QuestionService.createQuestion({ ...question });
    }

    @Mutation(() => Question)
    async editQuestion(
        @Arg("id") id: string,
        @Arg("question") question: EditQuestionInputType
    ): Promise<Question | undefined> {
        return QuestionService.editQuestion(id, question);
    }

    @Mutation(() => String)
    async deleteQuestion(@Arg("id") id: string): Promise<string> {
        await QuestionService.deleteQuestion(id);
        return "OK";
    }
}
