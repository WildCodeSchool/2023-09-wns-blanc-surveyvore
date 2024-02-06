import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;
}
