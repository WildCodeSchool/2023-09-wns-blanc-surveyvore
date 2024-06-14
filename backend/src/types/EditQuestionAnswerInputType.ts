import { Field, InputType } from "type-graphql";

@InputType()
export class EditQuestionAnswerInputType {
    @Field()
    content: string;
}