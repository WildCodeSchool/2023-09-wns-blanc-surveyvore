import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Survey } from "./survey";
import { QuestionType } from "./questionType";

@Entity()
@ObjectType()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  defaultQuestion: boolean;

  @Field()
  @ManyToOne(() => QuestionType, (questionType) => questionType.type)
  type: string;

  @Field()
  @ManyToOne(() => Survey, (survey) => survey.id)
  surveyId: string;
}
