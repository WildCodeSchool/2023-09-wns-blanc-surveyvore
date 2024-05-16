import { Question } from "@/types/question.type";

function AnswerDateQuestion({ question }: { question: Question }) {
  console.log(question)
  return <p>Date Question</p>
}

export default AnswerDateQuestion;
