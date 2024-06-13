import { DeleteResult } from "typeorm";
import { Question } from "../entities/question";
import { QuestionAnswer } from "../entities/questionAnswer";
import { CreateQuestionAnswerInputType } from "../types/CreateQuestionAnswerInputType";
import { EditQuestionAnswerInputType } from "../types/EditQuestionAnswerInputType";

export async function getQuestionAnswerById(
    id: string
): Promise<QuestionAnswer | null> {
    return QuestionAnswer.findOneBy({ id });
}

export async function createQuestionAnswer(
    questionAnswer: CreateQuestionAnswerInputType
): Promise<QuestionAnswer> {
    const newQuestionAnswer = new QuestionAnswer(questionAnswer);

    const question = await Question.findOneBy({
        id: questionAnswer.questionId,
    });
    if (question) {
        newQuestionAnswer.question = question;
    }
    return newQuestionAnswer.save();
}

export async function editQuestionAnswer(
    id: string,
    questionAnswer: EditQuestionAnswerInputType
): Promise<QuestionAnswer | undefined> {
    const questionAnswerToEdit = await getQuestionAnswerById(id);
    if (questionAnswerToEdit) {
        questionAnswerToEdit.content = questionAnswer.content;
        return questionAnswerToEdit.save();
    }
}
