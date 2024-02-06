import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "surveyvore",
  password: "passSurvey",
  database: "surveyvore",
  entities: [],
  logging: true,
  synchronize: true,
});
