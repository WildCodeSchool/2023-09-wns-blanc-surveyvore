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

  @Column({ nullable: true })
  @Field({ nullable: true })
  content: string;

  @ManyToOne(() => Question, (question) => question.id)
  @Field()
  question: Question;

  @ManyToOne(() => QuestionAnswer, (questionAnswer) => questionAnswer.id)
  @Field({ nullable: true })
  answer?: QuestionAnswer;

  @ManyToOne(() => User, (user) => user.id)
  @Field({ nullable: true })
  user?: User;
}
