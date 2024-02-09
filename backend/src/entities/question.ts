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
  constructor(
    datas: {
      title: string;
      description: string;
      typeId: string;
      defaultQuestion: boolean;
    } | null = null
  ) {
    super();
    if (datas) {
      this.title = datas.title;
      this.description = datas.description;
      this.typeId = datas.typeId;
      this.defaultQuestion = datas.defaultQuestion;
    }
  }

  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Field()
  defaultQuestion: boolean;

  @Field()
  @ManyToOne(() => QuestionType, (questionType) => questionType.type)
  typeId: string;

  @Field()
  @ManyToOne(() => Survey, (survey) => survey.id)
  surveyId: string;
}
