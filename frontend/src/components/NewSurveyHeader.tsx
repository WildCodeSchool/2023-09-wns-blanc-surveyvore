import { useState } from "react";
import Input from "./Input";
import Toggle from "./Toggle";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

// TODO: gérer les états de loading pendant la mutation et les erreurs

const EDIT_SURVEY = gql`
  mutation Mutation($survey: EditSurveyInputType!, $editSurveyId: String!) {
    editSurvey(survey: $survey, id: $editSurveyId) {
      title
      description
      collectingUserData
      private
      id
    }
  }
`;

function NewSurveyHeader({
  setCollectingData,
  collectingData,
  title,
  setTitle,
  description,
  setDescription,
}: {
  setCollectingData: React.Dispatch<React.SetStateAction<boolean>>;
  collectingData: boolean;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();
  const { id } = router.query;

  const [editSurvey] = useMutation(EDIT_SURVEY, {
    variables: {
      editSurveyId: id,
      survey: {
        title,
        description: description ? description : "",
        collectingUserData: collectingData,
        private: false,
      },
    },
    onCompleted: (data) => {
      setTitle(data.editSurvey.title);
      setCollectingData(data.editSurvey.collectingUserData);
    },
  });

  const EditOnBlur = () => {
    editSurvey({
      variables: {
        editSurveyId: id,
        survey: {
          title,
          description: description ? description : "",
          collectingUserData: collectingData,
          private: false,
        },
      },
    });
  };

  const onToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollectingData(e.target.checked);
    editSurvey({
      variables: {
        editSurveyId: id,
        survey: {
          title,
          description: description ? description : "",
          collectingUserData: e.target.checked,
          private: false,
        },
      },
    });
  };

  return (
    <section className="new-survey-header-section survey-section">
      <Input
        focus
        type="text"
        inputName="survey-title"
        placeholder="Formulaire sans titre"
        labelClassName="input-field"
        inputClassName="input"
        value={title}
        setValue={setTitle}
        onBlur={EditOnBlur}
      />
      {/* TODO: add public and privte buttons */}
      <Input
        textarea
        inputName="survey-description"
        labelClassName="input-field"
        labelName="Description (facultatif)"
        placeholder="Description de mon formulaire"
        inputClassName="textarea"
        value={description}
        setValue={setDescription}
        onBlur={EditOnBlur}
      />
      <div className="input-switch input-switch--sm">
        <Toggle
          checked={collectingData}
          inputName="collecting-data"
          labelName="Collecter les données de l'utilisateur·rice"
          onChange={onToggleChange}
        />
      </div>
    </section>
  );
}

export default NewSurveyHeader;

