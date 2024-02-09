import Input from "./Input";

function NewSurveyHeader({
  setCollectingData,
}: {
  setCollectingData: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <section className="new-survey-header-section survey-section">
      <Input
        type="text"
        inputName="survey-title"
        placeholder="Formulaire sans titre"
        labelClassName="input-field"
        inputClassName="input"
      />
      {/* TODO: add public and privte buttons */}
      <Input
        textarea
        inputName="survey-description"
        labelClassName="input-field"
        labelName="Description (facultatif)"
        placeholder="Description de mon formulaire"
        inputClassName="textarea"
      />
      <div className="input-switch input-switch--sm">
        <Input
          type="checkbox"
          inputName="collecting-data"
          labelName="Collecter les données de l'utilisateur·rice"
          toggle
          setToggle={setCollectingData}
        />
      </div>
    </section>
  );
}

export default NewSurveyHeader;

