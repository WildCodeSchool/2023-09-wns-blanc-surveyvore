import { Question } from "../entities/question";
import { QuestionAnswer } from "../entities/questionAnswer";
import { User } from "../entities/user";
import { UserAnswer } from "../entities/userAnswer";
import { getByEmailWithoutData } from "./user.service";

export async function addAnswer(answerData: {
  content?: string;
  question: string;
  answer?: string;
  user?: string;
}): Promise<UserAnswer> {
  const newAnswer = new UserAnswer();

  if (answerData.content) {
    newAnswer.content = answerData.content;
  }

  const question = await Question.findOneBy({ id: answerData.question });
  if (question) {
    newAnswer.question = question;
  }

  const option = await QuestionAnswer.findOneBy({
    id: answerData.answer,
  });
  if (option) {
    newAnswer.answer = option;
  }

  const user =
    answerData.user && (await getByEmailWithoutData(answerData.user));
  if (user) {
    newAnswer.user = user;
  }

  return newAnswer.save();
}
