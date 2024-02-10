import { Query, Resolver } from "type-graphql";
import * as QuestionTypeService from "../services/questionType.service";
import { QuestionType } from "../entities/questionType";

@Resolver()
export class QuestionTypeResolver {
  @Query(() => [QuestionType])
  getAllTypes(): Promise<QuestionType[]> {
    return QuestionTypeService.getQuestionTypes();
  }
}
