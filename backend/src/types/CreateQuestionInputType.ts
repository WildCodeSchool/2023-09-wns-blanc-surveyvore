import { Field, InputType } from "type-graphql";

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

  @Field()
  sort: number;
}
