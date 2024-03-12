import { Survey } from "../entities/survey";
import { User } from "../entities/user";
import { EditSurveyInputType } from "../types/EditSurveyInputType";
import { cryptoHash } from "../tools/hash.tools";

export function findSurveyById(id: string): Promise<Survey | null> {
  return Survey.findOne({
    where: {
      id: id,
    },
  });
}

export function findSurveysByOwner(userId: string): Promise<Survey[] | null> {
  return Survey.find({
    where: { user: { id: userId } },
  });
}

export async function create(datas: {
  title: string;
  user: User;
}): Promise<string> {
  const survey = new Survey(datas);
  survey.link = "LinkToCreate";
  const savedSurvey = await survey.save();
  savedSurvey.link = cryptoHash(savedSurvey.id);
  const savedSurveyWithId = await survey.save();
  return savedSurveyWithId.link;
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
