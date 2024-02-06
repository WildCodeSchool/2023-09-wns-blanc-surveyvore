import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Survey } from "../entities/survey";
import * as SurveyService from "../services/survey.service";

@Resolver()
export class SurveyResolver {
  @Query(() => Survey)
  getSurveyById(@Arg("surveyId") surveyId: string): Promise<Survey | null> {
    return SurveyService.findSurveyById(surveyId);
  }

  @Mutation(() => String)
  createSurvey(
    @Arg("title") title: string,
    @Arg("userId") userId: string
  ): Promise<string> {
    return SurveyService.create(title, userId);
  }
}
