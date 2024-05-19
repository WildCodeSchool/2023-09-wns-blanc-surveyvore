import { Question } from "@/types/question.type";
import Input from "../Input";
import { useState } from "react";

function AnswerDefaultQuestion({ defaultQuestion }: { defaultQuestion: Question }) {
  const [answerDefault, setAnswerDefault] = useState<string>("");
  let placeHolderForDefaultQuestion: string = "";
  switch (defaultQuestion.title) {
    case "Nom":
      placeHolderForDefaultQuestion = "Votre nom"
      break;
    case "Prénom":
      placeHolderForDefaultQuestion = "Votre prénom"
      break;
    case "Email":
      placeHolderForDefaultQuestion = "Votre email"
      break;
    case "Numéro de téléphone":
      placeHolderForDefaultQuestion = "Votre numéro de téléphone"
      break;
    default:
      break;
  }
  return (
    <div className="answer-default-question-container">
      <p className="answer-default-question-title">{defaultQuestion.title}</p>
      <Input
        inputName={defaultQuestion.id ? defaultQuestion.id : "id" + Math.random().toString(16).slice(2)} // to delete when id is changed in db
        placeholder={placeHolderForDefaultQuestion}
        value={answerDefault}
        setValue={setAnswerDefault}
      />
    </div>
  )
}

export default AnswerDefaultQuestion;
