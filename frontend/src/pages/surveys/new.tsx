import Input from "@/components/Input";

function NewSurvey() {
  return (
    <div>
      <p>new survey page</p>
      <Input
        type="text"
        inputName="survey-title"
        placeholder="Formulaire sans titre"
      />
      <div className="input-switch input-switch--sm">
        <Input
          type="checkbox"
          inputName="collecting-data"
          labelName="Collecting data"
          toggle
        />
      </div>
    </div>
  );
}

export default NewSurvey;

