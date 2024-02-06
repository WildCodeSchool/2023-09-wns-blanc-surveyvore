import { Field, ObjectType, Resolver } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Survey } from "./survey";
import { Role } from "./role";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Column()
  @Field()
  firstname: string;

  @Column()
  @Field()
  lastname: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Field()
  @ManyToOne(() => Role, (role) => role.name)
  roleID: string;

  @Field()
  @ManyToMany(() => Survey, (survey) => survey.invitedUsers)
  @JoinTable()
  surveysInvites?: Survey[];

  @Field()
  @ManyToMany(() => Survey, (survey) => survey.editingUsers)
  @JoinTable()
  surveysEditors?: Survey[];
}
