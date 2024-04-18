import { DeleteResult } from "typeorm";
import { Question } from "../entities/question";
import { Survey } from "../entities/survey";
import { QuestionType } from "../entities/questionType";
import { EditQuestionInputType } from "../types/EditQuestionInputType";

export async function getQuestionsBySurveyLink(
    surveyLink: string
): Promise<Question[]> {
    return Question.find({
        where: { survey: { link: surveyLink } },
        relations: {
            type: true,
            survey: true,
            answer: true,
        },
    });
}

export async function createQuestion(questionData: {
    title: string;
    survey: string;
    description: string;
    defaultQuestion: boolean;
    type: string;
}): Promise<Question> {
    const newQuestion = new Question(questionData);

    const survey = await Survey.findOneBy({ link: questionData.survey });
    if (survey) {
        newQuestion.survey = survey;
    }

    const questionType = await QuestionType.findOneBy({
        id: questionData.type,
    });
    if (questionType) {
        newQuestion.type = questionType;
    }

    return newQuestion.save();
}

export async function editQuestion(
    id: string,
    question: EditQuestionInputType
): Promise<Question | undefined> {
    const questionToEdit = await getQuestionById(id);
    if (questionToEdit) {
        questionToEdit.title = question.title;
        questionToEdit.type.id = question.type;
        questionToEdit.description = question.description;

        return questionToEdit.save();
    }
}

export async function deleteQuestion(
    id: string
): Promise<DeleteResult | undefined> {
    const questionToDelete = await getQuestionById(id);
    if (!questionToDelete) {
        throw new Error("Question not found");
    }
    if (questionToDelete) {
        return Question.delete({ id: id });
    }
}

export async function getQuestionById(id: string): Promise<Question | null> {
    return Question.findOne({
        where: { id: id },
        relations: {
            type: true,
            survey: true,
        },
    });
}
