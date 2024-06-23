import * as dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../resolvers/user.resolver";
import { verifyToken } from "../services/auth.service";
import { getByEmail } from "../services/user.service";
import { GraphQLError } from "graphql";
import { ApolloServer } from "apollo-server";
import { QuestionResolver } from "../resolvers/question.resolver";
import { QuestionTypeResolver } from "../resolvers/questionType.resolver";
import { SurveyResolver } from "../resolvers/survey.resolver";
import { SurveyStateResolver } from "../resolvers/surveyState.resolver";
import { ApolloServerPluginLandingPageDisabled } from "apollo-server-core";
import { dataSourceTest } from "./dbTest";
import { AnswerResolver } from "../resolvers/answer.resolver";

async function createServerTest(
  customContext: any = undefined
): Promise<ApolloServer> {
  dotenv.config();
  await dataSourceTest.initialize();

  const schema = await buildSchema({
    resolvers: [
      QuestionResolver,
      QuestionTypeResolver,
      SurveyResolver,
      SurveyStateResolver,
      UserResolver,
      AnswerResolver,
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
          "You are not authorized to perform this action.",
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

  return new ApolloServer({
    schema,
    context: customContext
      ? customContext
      : ({ req }) => {
          if (
            req?.headers.authorization === undefined ||
            process.env.JWT_SECRET_KEY === undefined
          ) {
            return {};
          } else {
            try {
              const bearer = req.headers.authorization.split("Bearer ")[1];

              return { token: bearer };
            } catch (e) {
              console.error(e);
              return {};
            }
          }
        },
    plugins: [...plugins],
  });
}

export default createServerTest;
