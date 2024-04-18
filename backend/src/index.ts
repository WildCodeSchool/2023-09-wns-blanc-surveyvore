import "reflect-metadata";
import * as dotenv from "dotenv";
import { dataSource } from "./config/db";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver";
import { ApolloServer } from "apollo-server";
import { SurveyResolver } from "./resolvers/survey.resolver";
import { QuestionResolver } from "./resolvers/question.resolver";
import { QuestionTypeResolver } from "./resolvers/questionType.resolver";
import { GraphQLError } from "graphql";
import { getByEmail } from "./services/user.service";
import { verifyToken } from "./services/auth.service";
import { SurveyStateResolver } from "./resolvers/surveyState.resolver";
import { ApolloServerPluginLandingPageDisabled } from "apollo-server-core";

const start = async () => {
  dotenv.config();

  const port = process.env.APP_PORT;

  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      SurveyResolver,
      QuestionResolver,
      QuestionTypeResolver,
      SurveyStateResolver,
    ],
    validate: { forbidUnknownValues: false },
    authChecker: async ({ context }, roles) => {
      try {
        const payload: any = verifyToken(context.token);
        const userFromDB = await getByEmail(payload.email);
        context.user = userFromDB;

        if (roles.length >= 1) {
          if (roles.includes(context.user.role)) {
            return true;
          } else {
            throw new Error();
          }
        }

        return true;
      } catch (e) {
        throw new GraphQLError(
          "You are not authorized !",
          null,
          null,
          null,
          null,
          null,
          {
            code: "UNAUTHENTICATED",
          }
        );
      }
    },
  });

  const plugins = [];
  if (process.env.NODE_ENV === "production") {
    plugins.push(ApolloServerPluginLandingPageDisabled());
  }

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      if (
        req?.headers.authorization === undefined ||
        process.env.JWT_SECRET_KEY === undefined
      ) {
        return {};
      }
      try {
        const token = req.headers.authorization.split("Bearer ")[1];
        return { token };
      } catch (e) {
        return {};
      }
    },
    plugins: [...plugins],
  });

  try {
    const { url } = await server.listen(port);
    console.log(`Server running at ${url}`);
  } catch (error) {
    console.error(error);
  }
};

void start();

