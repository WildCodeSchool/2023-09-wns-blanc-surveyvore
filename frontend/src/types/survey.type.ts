import { Question } from "./question.type";
import { SurveyState } from "./surveyState.type";

export type Survey = {
  id: number;
  title: string;
  description?: string;
  link: string;
  archived: boolean;
  private: boolean;
  collectingUserData: boolean;
  startDate?: Date;
  endDate?: Date;
  deleteDate?: Date;
  creationDate: Date;
  publicationDate?: Date;
  archiveDate?: Date;
  state: SurveyState;
  question: Question[];
};

