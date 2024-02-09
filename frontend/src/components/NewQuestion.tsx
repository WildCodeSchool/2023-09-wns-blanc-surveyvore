import { useState } from "react";
import Input from "./Input";
import QuestionType from "./QuestionType";

/**
 * conservation des données quand on édite une question alors qu'une autre est en cours d'édition mais non validée
 * meme composant pour l'édition et la création (get dans le cas de l'édition et valeurs par défaut en création)
 *
 */
function NewQuestion() {
  const [open, setOpen] = useState(true);
  if (!open) {
    return (
      <section className="survey-section">
        <p>new question</p>
      </section>
    );
  } else {
    return (
      <section className="survey-section">
        <Input
          type="text"
          inputName="survey-title"
          placeholder="Question sans titre"
          labelClassName="input-field"
          inputClassName="input"
        />
        <Input
          textarea
          inputName="survey-description"
          labelClassName="input-field"
          labelName="Description (facultatif)"
          placeholder="Description de ma question"
          inputClassName="textarea"
        />
        <QuestionType />
      </section>
    );
  }
}

export default NewQuestion;

