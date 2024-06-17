import { Question } from "../entities/question";
import { QuestionAnswer } from "../entities/questionAnswer";
import { User } from "../entities/user";
import { UserAnswer } from "../entities/userAnswer";
import { getMe } from "./auth.service";

export async function addAnswer(answerData: {
  content?: string;
  question: string;
  answer?: string;
  user?: string;
}): Promise<UserAnswer> {
  const newAnswer = new UserAnswer();

  if (answerData.content && answerData.content.length > 0) {
    newAnswer.content = answerData.content;
  }

  const question = await Question.findOneBy({ id: answerData.question });
  if (question) {
    newAnswer.question = question;
  }

  if (answerData.answer && answerData.answer.length > 0) {
    const option = await QuestionAnswer.findOneBy({
      id: answerData.answer,
    });
    if (option) {
      newAnswer.answer = option;
    }
  }
  const user = answerData.user;
  let userAnswering: User | null;
  if (user && user.length > 0) {
    userAnswering = await getMe(user);
    console.log("line 38 :", userAnswering);
    if (userAnswering) {
      newAnswer.user = userAnswering;
    }
  }
  console.log("line 44 :", newAnswer.user);

  return newAnswer.save();
}
