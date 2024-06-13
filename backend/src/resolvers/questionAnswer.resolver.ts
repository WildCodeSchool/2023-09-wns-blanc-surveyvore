import { Arg, Mutation, Resolver } from "type-graphql";
import { QuestionAnswer } from "../entities/questionAnswer";
import { CreateQuestionAnswerInputType } from "../types/CreateQuestionAnswerInputType";
import * as QuestionAnswerService from "../services/questionAnswer.service";
import { EditQuestionAnswerInputType } from "../types/EditQuestionAnswerInputType";

@Resolver()
export class QuestionAnswerResolver {
    @Mutation(() => QuestionAnswer)
    async createQuestionAnswer(
        @Arg("questionAnswer") questionAnswer: CreateQuestionAnswerInputType
    ): Promise<QuestionAnswer> {
        return QuestionAnswerService.createQuestionAnswer({
            ...questionAnswer,
        });
    }

    @Mutation(() => QuestionAnswer)
    async editQuestionAnswer(
        @Arg("id") id: string,
        @Arg("questionAnswer") questionAnswer: EditQuestionAnswerInputType
    ): Promise<QuestionAnswer | undefined> {
        return QuestionAnswerService.editQuestionAnswer(id, questionAnswer);
    }
}
