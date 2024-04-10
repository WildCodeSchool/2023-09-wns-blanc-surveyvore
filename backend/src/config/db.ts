import { DataSource } from "typeorm";
import { Question } from "../entities/question";
import { QuestionAnswer } from "../entities/questionAnswer";
import { QuestionType } from "../entities/questionType";
import { Role } from "../entities/role";
import { Survey } from "../entities/survey";
import { User } from "../entities/user";
import { UserAnswer } from "../entities/userAnswer";
import { SurveyState } from "../entities/surveyState";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_DB as string),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    Question,
    QuestionAnswer,
    QuestionType,
    Role,
    Survey,
    User,
    UserAnswer,
    SurveyState,
  ],
  logging: true,
  synchronize: false,
  migrations: ["migrations/*.ts"],
});
