import { SurveyState } from "../entities/surveyState";

export async function getSurveyStates(): Promise<SurveyState[]> {
  return SurveyState.find();
}

export async function getSurveyStateByName(
  state: string
): Promise<SurveyState | null> {
  return SurveyState.findOneBy({ state: state });
}
