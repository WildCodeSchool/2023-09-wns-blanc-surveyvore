import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import QuestionType from "./QuestionType";
import { useMutation, useQuery } from "@apollo/client";
import { RadioElement } from "./RadioGroup/RadioGroup";
import { IconName } from "@/types/iconName.type";
import Icon from "./Icon/Icon";
import { Question } from "@/types/question.type";
import QuestionOptions from "./QuestionOptions";
import DateOptions from "./DateOptions/DateOptions";
import {
    ADD_QUESTION_ANSWER,
    CREATE_QUESTION,
    DELETE_QUESTION,
    GET_TYPES,
} from "@/lib/queries/questions.queries";

function NewQuestion({
    setQuestions,
    question,
    questions,
    surveyLink,
    getQuestions,
    index,
}: {
    setQuestions: React.Dispatch<React.SetStateAction<any>>;
    question: Question;
    questions: Question[];
    surveyLink: string;
    getQuestions: () => void;
    index: number;
}) {
    // ----------------------------------States----------------------------------
    const [types, setTypes] = useState<QuestionType[]>([]);
    const [selectedType, setSelectedType] = useState<
        RadioElement | undefined | QuestionType
    >(undefined);

    const formRef = useRef<HTMLFormElement>(null);

    // ----------------------------------Queries----------------------------------

    const [createQuestion] = useMutation(CREATE_QUESTION);

    const [deleteQuestion] = useMutation(DELETE_QUESTION);

    const [addQuestionAnswer] = useMutation(ADD_QUESTION_ANSWER);

    const { loading, error } = useQuery(GET_TYPES, {
        onCompleted: (data) => {
            setTypes(data.getAllTypes);

            if (question.type.type) {
                setSelectedType(
                    data.getAllTypes.find(
                        (type: QuestionType) => type.id === question.type?.id
                    )
                );
            } else {
                setSelectedType(data.getAllTypes[0]);
            }
        },
    });

    // ----------------------------------Functions----------------------------------

    const handleClickCancel = () => {
        const newSetQuestions = [...questions];
        newSetQuestions
            .filter((q) => q.id === question.id)
            .map((q) => (q.isOpen = false));
        setQuestions(newSetQuestions);
    };

    useEffect(() => {
        if (question.type.type) {
            setSelectedType(
                types.find(
                    (type: QuestionType) => type.id === question.type?.id
                )
            );
        }
    }, [question.isOpen]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formRef.current === null) {
            console.error("Form ref is not attached to a form element");
            return;
        }

        const formData = new FormData(formRef.current);

        const form = {
            title: formData.get("question-title"),
            description: formData.get("question-description"),
            type: selectedType,
        };

        if (question.id !== "empty") {
            deleteQuestion({ variables: { id: question.id } });
        }

        createQuestion({
            variables: {
                question: {
                    title: form.title,
                    description: form.description,
                    type: form.type?.id,
                    survey: surveyLink,
                    defaultQuestion: false,
                    sort: index,
                },
            },
            onCompleted: (data) => {
                if (
                    data.createQuestion.type.type === "checkboxes" ||
                    data.createQuestion.type.type === "radio"
                ) {
                    if (question.answer) {
                        question.answer.map((answer, index) => {
                            addQuestionAnswer({
                                variables: {
                                    questionAnswer: {
                                        content: answer.content,
                                        questionId: data.createQuestion.id,
                                    },
                                },
                                onCompleted: () => {
                                    const totalAnswers =
                                        question.answer?.length || 0;

                                    if (index === totalAnswers - 1) {
                                        getQuestions();
                                    }
                                },
                                onError: (error) => {
                                    console.error(
                                        "Erreur lors de l'ajout de l'option :",
                                        error.message
                                    );
                                },
                            });
                        });
                    } else {
                        getQuestions();
                    }
                } else if (data.createQuestion.type.type === "date") {
                    if (question.answer) {
                        addQuestionAnswer({
                            variables: {
                                questionAnswer: {
                                    content: question.answer[0].content,
                                    questionId: data.createQuestion.id,
                                },
                            },
                            onCompleted: () => {
                                getQuestions();
                            },
                            onError: (error) => {
                                console.error(
                                    "Erreur lors de l'ajout de l'option de date :",
                                    error.message
                                );
                            },
                        });
                    } else {
                        getQuestions();
                    }
                } else {
                    getQuestions();
                }
            },
        });
    };

    function openCurrentQuestion() {
        const newSetQuestions = [...questions];
        newSetQuestions.map((q) => (q.isOpen = false));
        newSetQuestions
            .filter((q) => q.id === question.id)
            .map((q) => (q.isOpen = true));
        setQuestions(newSetQuestions);
    }

    function handleTitleChange(value: string) {
        setQuestions(
            questions.map((q) => {
                if (q.id === question.id) {
                    q.title = value;
                }
                return q;
            })
        );
    }

    function handleDescriptionChange(value: string) {
        setQuestions(
            questions.map((q) => {
                if (q.id === question.id) {
                    q.description = value;
                }
                return q;
            })
        );
    }

    // ----------------------------------return----------------------------------

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!question.isOpen && question.id !== "empty") {
        return (
            <section className="survey-section-closed">
                <div className="header">
                    <Icon
                        name={question.type?.icon as IconName}
                        width="1.125rem"
                        height="1.125rem"
                        color="current"
                    />
                    <p className="text-xl">{question.title}</p>
                </div>
                <div className="actions">
                    <button
                        className="button-md-primary-outline"
                        onClick={() => openCurrentQuestion()}
                    >
                        <Icon name="pen-clip" />
                    </button>
                    <button
                        className="button-md-grey-outline"
                        onClick={() => {
                            deleteQuestion({
                                variables: { id: question.id },
                                onCompleted: () => {
                                    getQuestions();
                                },
                            });
                        }}
                    >
                        <Icon name="trash" />
                    </button>
                </div>
            </section>
        );
    } else {
        return (
            <form
                ref={formRef}
                className="survey-section"
                onSubmit={handleSubmit}
            >
                <Input
                    type="text"
                    inputName="question-title"
                    placeholder="Titre de la question"
                    value={question.title}
                    setValue={handleTitleChange}
                />
                <Input
                    textarea
                    inputName="question-description"
                    labelName="Description (facultative)"
                    placeholder="Description de la question"
                    value={question.description}
                    setValue={handleDescriptionChange}
                />
                <QuestionType
                    types={types}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    questionId={question.id || "empty"}
                />
                {selectedType &&
                    ((selectedType as QuestionType).type === "checkboxes" ||
                        (selectedType as QuestionType).type === "radio") && (
                        <QuestionOptions
                            questions={questions}
                            setQuestions={setQuestions}
                            questionId={question.id || "empty"}
                        />
                    )}
                {selectedType &&
                    (selectedType as QuestionType).type === "date" && (
                        <DateOptions
                            questions={questions}
                            setQuestions={setQuestions}
                            questionId={question.id || "empty"}
                        />
                    )}
                <div className="actions">
                    <button
                        className="button-md-grey-outline"
                        onClick={() => handleClickCancel()}
                    >
                        Annuler
                    </button>
                    {question.id !== "empty" ? (
                        <button
                            className="button-md-primary-solid"
                            type="submit"
                        >
                            Enregistrer
                        </button>
                    ) : (
                        <button
                            className="button-md-primary-solid"
                            type="submit"
                        >
                            Ajouter
                        </button>
                    )}
                </div>
            </form>
        );
    }
}

export default NewQuestion;
