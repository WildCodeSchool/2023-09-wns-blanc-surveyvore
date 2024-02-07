import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Survey } from "../entities/survey";
import * as SurveyService from "../services/survey.service";
import { EditSurveyInputType } from "../types/EditSurveyInputType";

@Resolver()
export class SurveyResolver {
  @Query(() => Survey)
  getSurveyById(@Arg("surveyId") surveyId: string): Promise<Survey | null> {
    return SurveyService.findSurveyById(surveyId);
  }

  @Query(() => [Survey])
  getSurveysByOwner(@Arg("userId") userId: string): Promise<Survey[] | null> {
    return SurveyService.findSurveysByOwner(userId);
  }

  @Mutation(() => String)
  createSurvey(
    @Arg("title") title: string,
    @Arg("userId") userId: string
  ): Promise<string> {
    return SurveyService.create(title, userId);
  }

  @Mutation(() => Survey)
  editSurvey(
    @Arg("id") id: string,
    @Arg("survey") survey: EditSurveyInputType
  ): Promise<Survey | undefined> {
    return SurveyService.edit(id, survey);
  }

  @Mutation(() => Survey)
  archiveSurvey(
    @Arg("id") id: string,
    @Arg("archive") archive: boolean
  ): Promise<Survey | undefined> {
    return SurveyService.archive(id, archive);
  }
}

