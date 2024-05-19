import { Question } from "@/types/question.type";
import Input from "../Input";
import { useState } from "react";

function AnswerTextQuestion({ question }: { question: Question }) {
  const [answer, setAnswer] = useState<string>("");
  return (
    <>
      <Input
        inputName={question.id ? question.id : "id" + Math.random().toString(16).slice(2)} // to delete when id is changed in db
        placeholder="Réponse à la question"
        value={answer}
        setValue={setAnswer}
      />
    </>
  )
}

export default AnswerTextQuestion;
