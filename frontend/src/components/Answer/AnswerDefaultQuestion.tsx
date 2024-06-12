import { Question } from "@/types/question.type";
import Input from "../Input";
import { useEffect, useState } from "react";

function AnswerDefaultQuestion({ defaultQuestion, setAnswers, answers, isError }: { defaultQuestion: Question, answers: {}, setAnswers: React.Dispatch<React.SetStateAction<{}>>, isError: boolean }) {
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
  useEffect(() => {
    if (defaultQuestion && defaultQuestion.id) setAnswers({ ...answers, [defaultQuestion.id.toString()]: answerDefault });
  }, [answerDefault])
  return (
    <Input
      labelName={defaultQuestion.title}
      inputName={defaultQuestion.id ? defaultQuestion.id : "id" + Math.random().toString(16).slice(2)} // to delete when id is changed in db
      placeholder={placeHolderForDefaultQuestion}
      value={answerDefault}
      setValue={setAnswerDefault}
      inputClassName={isError ? "is-error" : undefined}
    />
  )
}

export default AnswerDefaultQuestion;
