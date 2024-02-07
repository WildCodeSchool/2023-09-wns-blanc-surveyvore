import { DeleteResult } from "typeorm";
import { Question } from "../entities/question";

export async function createQuestion(questionData: {
  title: string;
  surveyId: string;
  description: string;
  defaultQuestion: boolean;
  typeId: string;
}): Promise<Question> {
  const newQuestion = new Question(questionData);

  newQuestion.surveyId = questionData.surveyId;

  return newQuestion.save();
}

export async function getQuestionsBySurveyId(
  surveyId: string
): Promise<Question[]> {
  return Question.find({
    where: { surveyId: surveyId },
  });
}

export async function editQuestion(
  id: string,
  question: Question
): Promise<Question | undefined> {
  const questionToEdit = await Question.findOne({ where: { id: id } });

  if (questionToEdit) {
    questionToEdit.title = question.title;
    questionToEdit.typeId = question.typeId;
    questionToEdit.description = question.description;
    return questionToEdit.save();
  }
}

export async function deleteQuestion(id: string): Promise<DeleteResult> {
  return Question.delete(id);
}

