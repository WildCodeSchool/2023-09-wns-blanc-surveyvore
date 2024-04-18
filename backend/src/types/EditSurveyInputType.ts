import { Field, InputType } from "type-graphql";

@InputType()
export class EditSurveyInputType {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  private: boolean;

  @Field()
  collectingUserData: boolean;
}
