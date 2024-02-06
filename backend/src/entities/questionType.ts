import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class QuestionType extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Column()
  @Field()
  type: string;
}
