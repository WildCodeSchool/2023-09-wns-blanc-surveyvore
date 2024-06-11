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
  startDate?: string;
  endDate?: string;
  deleteDate?: string;
  creationDate: string;
  publicationDate?: string;
  archiveDate?: string;
  state: SurveyState;
  question: Question[];
};

