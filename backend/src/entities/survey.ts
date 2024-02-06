import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
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
  description?: string;

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
  startDate?: Date;

  @Column()
  @Field()
  endDate?: Date;

  @Column()
  @Field()
  deleteDate?: Date;

  @Column()
  @Field()
  creationDate: Date;

  @Column()
  @Field()
  publicationDate?: Date;

  @Column()
  @Field()
  archiveDate?: Date;

  @Field()
  @ManyToOne(() => User, (user) => user.id)
  userId: string;

  @ManyToMany(() => User, {
    cascade: ["insert"],
  })
  @JoinTable()
  invitedUsers: User[];

  @ManyToMany(() => User, {
    cascade: ["insert"],
  })
  @JoinTable()
  editingUsers: User[];

  constructor(
    datas: {
      title: string;
      userId: string;
    } | null = null
  ) {
    super();
    if (datas) {
      this.title = datas.title;
      this.creationDate = new Date();
      this.userId = datas.userId;
      this.collectingUserData = false;
      this.private = false;
      this.archived = false;
    }
  }
}
