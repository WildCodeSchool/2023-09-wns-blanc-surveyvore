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
    </div>
  );
}

export default NewSurvey;

