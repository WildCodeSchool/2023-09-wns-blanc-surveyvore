import { Field, ObjectType, Resolver } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Survey } from "./survey";
import { Role } from "./role";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  firstname?: string;

  @Column()
  @Field()
  lastname?: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  hashedPassword: string;

  @Field()
  @ManyToOne(() => Role, (role) => role.name)
  roleId: string;
}
