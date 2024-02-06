import { Survey } from "../entities/survey";

export function findSurveyById(id: string): Promise<Survey | null> {
  return Survey.findOne({
    where: {
      id: id,
    },
  });
}

export async function create(title: string, userId: string): Promise<string> {
  const survey = new Survey();
  survey.title = title;
  survey.userId = userId;
  const savedSurvey = await survey.save();
  return savedSurvey.id;
}
