import { Answer, Question } from "@/types/question.type";
import Input from "./Input";
import { useState } from "react";
import Icon from "./Icon/Icon";

export default function QuestionOptions({
    questions,
    setQuestions,
    questionId,
}: {
    questions: Question[];
    setQuestions: (questions: Question[]) => void;
    questionId: string;
}) {
    const currentQuestion: Question | null =
        questions.find((question) => question.id === questionId) || null;

    const questionOptions: Answer[] = currentQuestion?.answer || [];

    function handleQuestionOptionRemove(
        index: number,
        event: React.MouseEvent
    ) {
        event.preventDefault();

        setQuestions(
            questions.map((question) => {
                if (question.id === questionId) {
                    if (question.answer) {
                        question.answer = question.answer.filter(
                            (option, optionIndex) => optionIndex !== index
                        );
                    }
                }
                return question;
            })
        );
    }

    function handleQuestionOptionAdd(event: React.MouseEvent) {
        event.preventDefault();

        setQuestions(
            questions.map((question) => {
                if (question.id === questionId) {
                    if (question.answer) {
                        question.answer = [
                            ...question.answer,
                            { id: "", content: "" },
                        ];
                    } else {
                        question.answer = [{ id: "", content: "" }];
                    }
                }
                return question;
            })
        );
    }

    return (
        <div className="options">
            <p className="subtitle">Options</p>
            {questionOptions.length > 0 &&
                questionOptions.map((option, index) => (
                    <div className="option" key={index}>
                        <Input
                            inputName={`option-${index}`}
                            value={option.content}
                            setValue={(value: string) => {
                                const options = [...questionOptions];
                                options[index].content = value;
                                setQuestions(
                                    questions.map((question) => {
                                        if (question.id === questionId) {
                                            question.answer = options;
                                        }
                                        return question;
                                    })
                                );
                            }}
                            placeholder="Option"
                        />
                        <button
                            className="button-md-grey-outline"
                            onClick={(event) =>
                                handleQuestionOptionRemove(index, event)
                            }
                        >
                            <Icon name="trash" />
                        </button>
                    </div>
                ))}
            <button
                className="button-md-grey-outline"
                onClick={(event) => handleQuestionOptionAdd(event)}
            >
                Ajouter une option
                <Icon name="plus" />
            </button>
        </div>
    );
}
