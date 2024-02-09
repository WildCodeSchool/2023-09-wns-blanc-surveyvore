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

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstname?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
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
