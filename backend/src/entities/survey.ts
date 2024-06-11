import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { SurveyState } from "./surveyState";
import { Question } from "./question";

@ObjectType()
@Entity()
export class Survey extends BaseEntity {
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

  @Column({ type: "bigint", nullable: true })
  @Field({ nullable: true })
  startDate?: string;

  @Column({ type: "bigint", nullable: true })
  @Field({ nullable: true })
  endDate?: string;

  @Column({
    type: "bigint",
    nullable: true,
  })
  @Field({ nullable: true })
  deleteDate?: string;

  @Column({ type: "bigint" })
  @Field()
  creationDate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  publicationDate?: Date;

  @Column({ type: "bigint", nullable: true })
  @Field({ nullable: true })
  archiveDate?: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id)
  user: User;

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

  @Field()
  @ManyToOne(() => SurveyState, (state) => state.id)
  state: SurveyState;

  @Field(() => [Question], { nullable: true })
  @OneToMany(() => Question, (question) => question.survey)
  question: Question[];

  constructor(
    datas: {
      title: string;
      user: User;
    } | null = null
  ) {
    super();
    if (datas) {
      this.title = datas.title;
      this.creationDate = new Date().getTime().toString();
      this.collectingUserData = false;
      this.private = false;
      this.archived = false;
      this.user = datas.user;
    }
  }
}
