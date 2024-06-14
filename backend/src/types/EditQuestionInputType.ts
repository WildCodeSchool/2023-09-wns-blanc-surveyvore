import { Field, InputType } from "type-graphql";
import { QuestionType } from "../entities/questionType";

@InputType()
export class EditQuestionInputType {
    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    type?: string;

    @Field({ nullable: true })
    sort?: number;
}
