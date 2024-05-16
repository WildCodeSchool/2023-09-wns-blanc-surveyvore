import { Question } from "@/types/question.type";

function AnswerRadioQuestion({ question }: { question: Question }) {
  console.log(question)
  return <p>Radio Question</p>
}

export default AnswerRadioQuestion;
