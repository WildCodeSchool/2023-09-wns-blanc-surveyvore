import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./question";

@Entity()
@ObjectType()
export class QuestionAnswer extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @Field()
    id: string;

    @Column()
    @Field()
    content: string;

    @Field(() => Question)
    @ManyToOne(() => Question, (question) => question.id)
    question: Question;
}
