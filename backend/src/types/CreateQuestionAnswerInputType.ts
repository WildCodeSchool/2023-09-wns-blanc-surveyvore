import { Field, InputType } from "type-graphql";

@InputType()
export class CreateQuestionAnswerInputType {
    @Field()
    content: string;

    @Field()
    questionId: string;
}