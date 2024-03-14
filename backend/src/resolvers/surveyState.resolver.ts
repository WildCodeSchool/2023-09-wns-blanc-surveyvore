import { Arg, Query, Resolver } from "type-graphql";
import * as SurveyStateService from "../services/surveyState.service";
import { SurveyState } from "../entities/surveyState";

@Resolver()
export class SurveyStateResolver {
  @Query(() => [SurveyState])
  getSurveyStates(): Promise<SurveyState[]> {
    return SurveyStateService.getSurveyStates();
  }

  @Query(() => SurveyState)
  getSurveyStateByStateName(
    @Arg("state") state: string
  ): Promise<SurveyState | null> {
    return SurveyStateService.getSurveyStateByName(state);
  }
}
