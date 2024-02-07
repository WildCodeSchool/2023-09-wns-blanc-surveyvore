import { Field, InputType } from "type-graphql";

@InputType()
export class CreateQuestionInputType {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  typeId: string;

  defaultQuestion: boolean;
}

