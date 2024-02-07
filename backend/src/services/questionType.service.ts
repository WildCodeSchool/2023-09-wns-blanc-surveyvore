import { QuestionType } from "../entities/questionType";

export async function getQuestionTypes(): Promise<QuestionType[]> {
  return QuestionType.find();
}
