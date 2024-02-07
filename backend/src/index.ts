import "reflect-metadata";
import * as dotenv from "dotenv";
import { dataSource } from "./config/db";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver";
import { ApolloServer } from "apollo-server";
import { SurveyResolver } from "./resolvers/survey.resolver";

const start = async () => {
  dotenv.config();

  const port = process.env.APP_PORT;

  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [UserResolver, SurveyResolver],
    validate: { forbidUnknownValues: false },
  });

  const server = new ApolloServer({
    schema,
  });

  try {
    const { url } = await server.listen(port);
    console.log(`Server running at ${url}`);
  } catch (error) {
    console.error(error);
  }
};

void start();
