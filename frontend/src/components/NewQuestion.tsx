import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import QuestionType from "./QuestionType";
import Button from "./Button";
import { gql, useMutation, useQuery } from "@apollo/client";

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

function NewQuestion({
  open,
  setOpen,
  setQuestions,
  question,
  questions,
  index,
  surveyLink,
}: {
  question: {
    isOpen: boolean;
    title: string;
    description: string;
    type: string;
  };
  index: number;
  questions: any; //créer le type question. Questions est un tableau de Question
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setQuestions: React.Dispatch<React.SetStateAction<any>>;
  surveyLink: string;
}) {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("Texte libre");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const handleClickCancel = () => {
    const newSetQuestions = [...questions];
    newSetQuestions[index].isOpen = false;
    setQuestions(newSetQuestions);
  };

  const [createQuestion] = useMutation(CREATE_QUESTION);

  const { loading, error } = useQuery(GET_TYPES, {
    onCompleted: (data) => {
      setTypes(data.getAllTypes);
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
          type: form.type,
          survey: surveyLink,
          defaultQuestion: false,
        },
      },
    });

    question.isOpen = false;

    setQuestions((prev: any) => {
      return [
        ...prev,
        {
          isOpen: true,
          title: question.title,
          description: question.description,
          type: question.type,
        },
      ];
    });
  };

  if (!question.isOpen) {
    return (
      <section className="survey-section">
        <p>new question</p>
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
          selectedType={question.type}
          setSelectedType={setSelectedType}
        />
        <div className="actions">
          <Button
            type="button"
            text="Annuler"
            handleClick={handleClickCancel}
            className="button-md-red-outline"
          />
          <Button
            type="submit"
            text="Ajouter"
            className="button-md-primary-solid"
          />
        </div>
      </form>
    );
  }
}

export default NewQuestion;

