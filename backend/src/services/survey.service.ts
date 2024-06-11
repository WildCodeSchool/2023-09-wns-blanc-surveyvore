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
      question: {
        answer: true,
        type: true,
      },
    },
  });
}

export function findSurveysByOwner(user: User): Promise<Survey[] | null> {
  return Survey.find({
    where: {
      user: { id: user.id },
    },
    relations: {
      state: true,
      question: true,
    },
    order: {
      creationDate: "DESC",
    },
  });
}

export function findSurveyByState(user: User, state: string) {
  if (state) {
    return Survey.find({
      where: { user: { id: user.id }, state: { state: state } },
      relations: {
        state: true,
      },
    });
  } else {
    return Survey.find({
      where: { user: { id: user.id } },
      relations: {
        state: true,
      },
    });
  }
}

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
    relations: {
      state: true,
      question: true,
    },
  });

  if (surveyToArchive) {
    surveyToArchive.archived = archive;
    surveyToArchive.archiveDate = new Date().getTime().toString();
    surveyToArchive.state =
      archive === true
        ? ((await getSurveyStateByName("archived")) as SurveyState)
        : ((await getSurveyStateByName("closed")) as SurveyState);

    return await surveyToArchive.save();
  }
}

export async function softDelete(link: string): Promise<Survey | undefined> {
  const surveyToSoftDelete = await Survey.findOne({
    where: { link: link },
  });

  if (surveyToSoftDelete) {
    surveyToSoftDelete.deleteDate = new Date().getTime().toString();
    return await surveyToSoftDelete.save();
  }
}
