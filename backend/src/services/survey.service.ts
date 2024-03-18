import { Survey } from "../entities/survey";
import { User } from "../entities/user";
import { EditSurveyInputType } from "../types/EditSurveyInputType";
import { cryptoHash } from "../tools/hash.tools";
import { SurveyState } from "../entities/surveyState";
import { getSurveyStateByName } from "./surveyState.service";

export function findSurveyByLink(link: string): Promise<Survey | null> {
  return Survey.findOne({
    where: {
      link: link,
    },
    relations: {
      state: true,
      question: true,
    },
  });
}

export function findSurveysByOwner(userId: string): Promise<Survey[] | null> {
  return Survey.find({
    where: { user: { id: userId } },
    relations: {
      state: true,
      question: true,
    },
  });
}

// export function findSurveyByState(state: string) {
//   return Survey.find({
//     where: { state: { state: state } },
//     relations: {
//       state: true,
//     },
//   });
// }

export async function create(datas: {
  title: string;
  user: User;
}): Promise<string> {
  const survey = new Survey(datas);
  survey.link = "LinkToCreate";
  survey.state = (await getSurveyStateByName("draft")) as SurveyState;
  const savedSurvey = await survey.save();
  savedSurvey.link = cryptoHash(savedSurvey.id);
  const savedSurveyWithId = await survey.save();
  return savedSurveyWithId.link;
}

export async function edit(
  link: string,
  survey: EditSurveyInputType
): Promise<Survey | undefined> {
  const surveyToEdit = await Survey.findOne({ where: { link: link } });
  if (surveyToEdit) {
    surveyToEdit.title = survey.title;
    surveyToEdit.description = survey.description;
    surveyToEdit.private = survey.private;
    surveyToEdit.collectingUserData = survey.collectingUserData;
    return await surveyToEdit.save();
  }
}

export async function archive(
  link: string,
  archive: boolean
): Promise<Survey | undefined> {
  const surveyToArchive = await Survey.findOne({
    where: { link: link },
  });
  if (surveyToArchive) {
    surveyToArchive.archived = archive;
    return await surveyToArchive.save();
  }
}

