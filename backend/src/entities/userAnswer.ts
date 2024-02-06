import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./question";
import { QuestionAnswer } from "./questionAnswer";
import { User } from "./user";

@Entity()
@ObjectType()
export class UserAnswer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  content: string;

  @ManyToOne(() => Question, (question) => question.id)
  @Field()
  questionId: string;

  @ManyToOne(() => QuestionAnswer, (questionAnswer) => questionAnswer.id)
  @Field()
  answerId: string;

  @ManyToOne(() => User, (user) => user.id)
  @Field()
  userId: string;
}
