import Input from "../Input";
import { useState } from "react";
import { QuestionForAnswerPage } from "@/types/questionForAnswerPage.type";

function AnswerTextQuestion({ question, questions, setQuestions }: { question: QuestionForAnswerPage, questions: QuestionForAnswerPage[] | undefined, setQuestions: React.Dispatch<React.SetStateAction<QuestionForAnswerPage[]>> }) {
  const [answer, setAnswer] = useState<string>("");
  const onClick = () => {
    const updatedQuestion = questions && questions.map(q => {
      if (q.id === question.id) {
        return { ...q, isError: false }
      } else {
        return q
      }
    }
    )
    if (updatedQuestion) {
      setQuestions(updatedQuestion);
    }
  }
  return (
    <>
      <Input
        inputName={question.id}
        placeholder="Réponse à la question"
        value={answer}
        setValue={setAnswer}
        onClick={onClick}
      />
    </>
  )
}

export default AnswerTextQuestion;
