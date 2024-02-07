import { Survey } from "../entities/survey";
import { EditSurveyInputType } from "../types/EditSurveyInputType";

export function findSurveyById(id: string): Promise<Survey | null> {
  return Survey.findOne({
    where: {
      id: id,
    },
  });
}

export function findSurveysByOwner(userId: string): Promise<Survey[] | null> {
  return Survey.find({
    where: {
      userId: userId,
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

export async function edit(
  id: string,
  survey: EditSurveyInputType
): Promise<Survey | undefined> {
  const surveyToEdit = await Survey.findOne({ where: { id: id } });
  if (surveyToEdit) {
    surveyToEdit.title = survey.title;
    surveyToEdit.description = survey.description;
    surveyToEdit.private = survey.private;
    surveyToEdit.collectingUserData = survey.collectingUserData;
    return await surveyToEdit.save();
  }
}

export async function archive(
  id: string,
  archive: boolean
): Promise<Survey | undefined> {
  const surveyToArchive = await Survey.findOne({ where: { id: id } });
  if (surveyToArchive) {
    surveyToArchive.archived = archive;
    return await surveyToArchive.save();
  }
}

