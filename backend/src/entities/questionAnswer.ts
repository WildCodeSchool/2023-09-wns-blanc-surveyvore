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
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Column()
  @Field()
  content: string;

  @ManyToOne(() => Question, (question) => question.id)
  @Field()
  questionId: string;
}
