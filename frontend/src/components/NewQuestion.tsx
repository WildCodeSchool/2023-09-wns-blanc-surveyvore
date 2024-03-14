import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import QuestionType from "./QuestionType";
import Button from "./Button";
import { gql, useMutation, useQuery } from "@apollo/client";
import { RadioElement } from "./RadioGroup/RadioGroup";
import { IconName } from "@/types/iconName.type";
import Icon from "./Icon/Icon";
import { Question } from "@/types/question.type";

/**
 * conservation des données quand on édite une question alors qu'une autre est en cours d'édition mais non validée
 * meme composant pour l'édition et la création (get dans le cas de l'édition et valeurs par défaut en création)
 *
 */

const GET_TYPES = gql`
  query Query {
    getAllTypes {
      id
      type
      icon
    }
  }
`;

const CREATE_QUESTION = gql`
  mutation Mutation($question: CreateQuestionInputType!) {
    createQuestion(question: $question) {
      title
    }
  }
`;

const DELETE_QUESTION = gql`
  mutation Mutation($id: String!) {
    deleteQuestion(id: $id)
  }
`;

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const handleClickCancel = () => {
    const newSetQuestions = [...questions];
    newSetQuestions
      .filter((q) => q.id === question.id)
      .map((q) => (q.isOpen = false));
    setQuestions(newSetQuestions);
  };

  const [createQuestion] = useMutation(CREATE_QUESTION);

  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    onCompleted: () => {
      refetch();
    },
  });

  const { loading, error } = useQuery(GET_TYPES, {
    onCompleted: (data) => {
      setTypes(data.getAllTypes);

      setSelectedType(data.getAllTypes[0]);
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
      title: formData.get("survey-title"),
      description: formData.get("survey-description"),
      type: selectedType,
    };

    createQuestion({
      variables: {
        question: {
          title: form.title,
          description: form.description,
          type: form.type?.id,
          survey: surveyLink,
          defaultQuestion: false,
        },
      },
      onCompleted: () => {
        refetch();
      },
    });

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
            onClick={() => openCurrentQuestion()}>
            <Icon name="pen-clip" />
          </button>
          <button
            className="button-md-grey-outline"
            onClick={() => deleteQuestion({ variables: { id: question.id } })}>
            <Icon name="trash" />
          </button>
        </div>
      </section>
    );
  } else {
    return (
      <form ref={formRef} className="survey-section" onSubmit={handleSubmit}>
        <Input
          type="text"
          inputName="survey-title"
          placeholder={question.title}
          labelClassName="input-field"
          inputClassName="input"
          value={title}
          setValue={setTitle}
        />
        <Input
          textarea
          inputName="survey-description"
          labelClassName="input-field"
          labelName="Description (facultatif)"
          placeholder={question.description}
          inputClassName="textarea"
          value={description}
          setValue={setDescription}
        />
        <QuestionType
          types={types}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <div className="actions">
          <button
            className="button-md-grey-outline"
            onClick={() => handleClickCancel()}>
            Annuler
          </button>
          <button className="button-md-primary-solid" type="submit">
            Ajouter
          </button>
        </div>
      </form>
    );
  }
}

export default NewQuestion;

