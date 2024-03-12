import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import * as SurveyService from "../services/survey.service";
import { EditSurveyInputType } from "../types/EditSurveyInputType";
import { User } from "../entities/user";
import { Survey } from "../entities/survey";

@Resolver()
export class SurveyResolver {
  @Query(() => Survey)
  getSurveyByLink(@Arg("surveyLink") surveyLink: string): Promise<Survey | null> {
    return SurveyService.findSurveyByLink(surveyLink);
  }
  @Query(() => [Survey])
  getSurveysByOwner(@Arg("userId") userId: string): Promise<Survey[] | null> {
    return SurveyService.findSurveysByOwner(userId);
  }

  @Authorized()
  @Mutation(() => String)
  createSurvey(
    @Arg("title") title: string,
    @Ctx("user") user: User
  ): Promise<string> {
    return SurveyService.create({ title, user });
  }

  @Mutation(() => Survey)
  editSurvey(
    @Arg("link") link: string,
    @Arg("survey") survey: EditSurveyInputType
  ): Promise<Survey | undefined> {
    return SurveyService.edit(link, survey);
  }

  @Mutation(() => Survey)
  archiveSurvey(
    @Arg("link") link: string,
    @Arg("archive") archive: boolean
  ): Promise<Survey | undefined> {
    return SurveyService.archive(link, archive);
  }
}

