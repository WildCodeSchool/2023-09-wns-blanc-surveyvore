import { Field, InputType } from "type-graphql";
import { QuestionType } from "../entities/questionType";

@InputType()
export class EditQuestionInputType {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  type: string;
}
