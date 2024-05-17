import { Question } from "@/types/question.type";
import Input from "../Input";
import { useState } from "react";

function AnswerTextQuestion({ question }: { question: Question }) {
  const [answer, setAnswer] = useState<string>("");
  return (
    <>
      <div className="answer-text-question-container">
        <p className="answer-text-question-title">{question.title}</p>
        {question.description && <p className="answer-text-question-description">{question.description}</p>}
        <Input
          inputName={question.id ? question.id : "id" + Math.random().toString(16).slice(2)} // to delete when id is changed in db
          placeholder="Réponse à la question"
          value={answer}
          setValue={setAnswer}
        />
      </div>
    </>
  )
}

export default AnswerTextQuestion;
