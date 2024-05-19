import { IconName } from "./iconName.type";

export type Question = {
  id: string | undefined;
  title: string;
  type: QuestionType;
  description: string;
  isOpen: boolean;
  answer: Answer[] | undefined;
};

export type QuestionType = {
  id: string;
  type: string;
  icon: IconName;
};

export type Answer = {
  id: string;
  content: string;
};
