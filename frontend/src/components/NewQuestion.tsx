import { useRef, useState } from "react";
import Input from "./Input";
import QuestionType from "./QuestionType";
import { gql, useMutation, useQuery } from "@apollo/client";
import { RadioElement } from "./RadioGroup/RadioGroup";
import { IconName } from "@/types/iconName.type";
import Icon from "./Icon/Icon";
import { Question } from "@/types/question.type";
import QuestionOptions from "./QuestionOptions";
import DateOptions from "./DateOptions/DateOptions";
import { ADD_QUESTION_ANSWER, CREATE_QUESTION, DELETE_QUESTION, EDIT_QUESTION, EDIT_QUESTION_ANSWER, GET_TYPES } from "@/lib/queries/questions.queries";

/**
 * conservation des données quand on édite une question alors qu'une autre est en cours d'édition mais non validée
 * meme composant pour l'édition et la création (get dans le cas de l'édition et valeurs par défaut en création)
 *
 */

function NewQuestion({
  setQuestions,
  question,
  questions,
  surveyLink,
  refetch,
}: {
  setQuestions: React.Dispatch<React.SetStateAction<any>>;
  question: Question;
  questions: Question[];
  surveyLink: string;
  refetch: () => void;
}) {
  const [types, setTypes] = useState<QuestionType[]>([]);
  const [selectedType, setSelectedType] = useState<
    RadioElement | undefined | QuestionType
  >(undefined);
  const [title, setTitle] = useState(question.title || "");
  const [description, setDescription] = useState(question.description || "");

  const formRef = useRef<HTMLFormElement>(null);

  const handleClickCancel = () => {
    const newSetQuestions = [...questions];
    newSetQuestions
      .filter((q) => q.id === question.id)
      .map((q) => (q.isOpen = false));
    setQuestions(newSetQuestions);
  };

  const [createQuestion] = useMutation(CREATE_QUESTION);

  const [editQuestion] = useMutation(EDIT_QUESTION);

    const [deleteQuestion] = useMutation(DELETE_QUESTION, {
        onCompleted: () => {
            refetch();
        },
    });

    const [addQuestionAnswer] = useMutation(ADD_QUESTION_ANSWER);

    const [editQuestionAnswer] = useMutation(EDIT_QUESTION_ANSWER);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
            editQuestion({
                variables: {
                    id: question.id,
                    question: {
                        title: form.title,
                        description: form.description,
                        type: form.type?.id,
                    },
                },
                onCompleted: (data) => {
                    if (
                        data.editQuestion.type.type === "checkboxes" ||
                        "radio" ||
                        "checkbox"
                    ) {
                        if (question.answer) {
                            question.answer.map((answer) => {
                                addQuestionAnswer({
                                    variables: {
                                        questionAnswer: {
                                            content: answer.content,
                                            questionId: data.editQuestion.id,
                                        },
                                    },
                                });
                            });
                        }
                    }
                },
            });
            refetch();
        } else {
            createQuestion({
                variables: {
                    question: {
                        title: form.title,
                        description: form.description,
                        type: form.type?.id,
                        survey: surveyLink,
                        defaultQuestion: false,
                        // answer: question.answer
                        //     ? question.answer.map((answer) => ({
                        //           content: answer.content,
                        //       }))
                        //     : [],
                    },
                },
                onCompleted: (data) => {
                    if (
                        data.createQuestion.type.type === "checkboxes" ||
                        "radio" ||
                        "checkbox"
                    ) {
                        if (question.answer) {
                            question.answer.map((answer) => {
                                addQuestionAnswer({
                                    variables: {
                                        questionAnswer: {
                                            content: answer.content,
                                            questionId: data.createQuestion.id,
                                        },
                                    },
                                });
                            });
                        }
                    }
                },
            });
            refetch();
        }

    question.isOpen = false;
  };

  function openCurrentQuestion() {
    const newSetQuestions = [...questions];
    newSetQuestions.map((q) => (q.isOpen = false));
    newSetQuestions
      .filter((q) => q.id === question.id)
      .map((q) => (q.isOpen = true));
    setQuestions(newSetQuestions);
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
                        onClick={() =>
                            deleteQuestion({ variables: { id: question.id } })
                        }
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
                    value={title}
                    setValue={setTitle}
                />
                <Input
                    textarea
                    inputName="question-description"
                    labelName="Description (facultative)"
                    placeholder="Description de la question"
                    value={description}
                    setValue={setDescription}
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

