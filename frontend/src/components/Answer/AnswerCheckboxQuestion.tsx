import { Question } from "@/types/question.type";

function AnswerCheckboxQuestion({ question }: { question: Question }) {
  console.log(question)
  return <p>checkbox Question</p>
}

export default AnswerCheckboxQuestion;
