import { useState } from "react";
import Input from "./Input";
import Toggle from "./Toggle";

function NewSurveyHeader({
  setCollectingData,
  collectingData,
}: {
  setCollectingData: React.Dispatch<React.SetStateAction<boolean>>;
  collectingData: boolean;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <section className="new-survey-header-section survey-section">
      <Input
        type="text"
        inputName="survey-title"
        placeholder="Formulaire sans titre"
        labelClassName="input-field"
        inputClassName="input"
        value={title}
        setValue={setTitle}
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
      />
      <div className="input-switch input-switch--sm">
        <Toggle
          checked={collectingData}
          inputName="collecting-data"
          labelName="Collecter les données de l'utilisateur·rice"
          setToggle={setCollectingData}
        />
      </div>
    </section>
  );
}

export default NewSurveyHeader;

