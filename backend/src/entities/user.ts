import { Field, ObjectType, Resolver } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./role";
import { Survey } from "./survey";

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
  password: string;

  @Field()
  @ManyToOne(() => Role, (role) => role.name)
  role: Role;

  @Field(() => [Survey])
  @OneToMany(() => Survey, (survey) => survey.user)
  surveys: Survey[];
}
