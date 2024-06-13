import { IconName } from "./iconName.type";

export type QuestionForAnswerPage = {
  id: string;
  title: string;
  type: QuestionType;
  description: string;
  isOpen: boolean;
  answer: Answer[] | undefined;
  isError: boolean;
};

export type QuestionType = {
  id: string;
  type: string;
  icon: IconName;
};

export type Answer = {
  id: string;
  content: string;
  questionId: string;
};
