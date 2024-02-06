import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";
import { User } from "./user";

@ObjectType()
@Entity()
export class Survey extends BaseEntity {
  @PrimaryGeneratedColumn()
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
  link: string;

  @Column()
  @Field()
  archived: boolean;

  @Column()
  @Field()
  private: boolean;

  @Column()
  @Field()
  collectingUserData: boolean;

  @Column()
  @Field()
  startDate: Timestamp;

  @Column()
  @Field()
  endDate: Timestamp;

  @Column()
  @Field()
  deleteDate: Timestamp;

  @Column()
  @Field()
  creationDate: Timestamp;

  @Column()
  @Field()
  publicationDate: Timestamp;

  @Column()
  @Field()
  archiveDate: Timestamp;

  @Field()
  @ManyToOne(() => User, (user) => user.id)
  userId: string;

  @Field()
  @ManyToMany(() => User, (user) => user.surveysInvites)
  @JoinTable()
  invitedUsers?: User[];

  @Field()
  @ManyToMany(() => User, (user) => user.surveysEditors)
  @JoinTable()
  editingUsers?: User[];
}
