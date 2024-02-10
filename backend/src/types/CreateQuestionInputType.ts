import { Field, InputType } from "type-graphql";
import { Survey } from "../entities/survey";
import { QuestionType } from "../entities/questionType";

@InputType()
export class CreateQuestionInputType {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  type: string;

  @Field()
  defaultQuestion: boolean;

  @Field()
  survey: string;
}
