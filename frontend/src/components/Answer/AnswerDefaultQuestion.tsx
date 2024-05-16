import { Question } from "@/types/question.type";

function AnswerDefaultQuestion({ defaultQuestion }: { defaultQuestion: Question }) {
  console.log(defaultQuestion)
  return <p>DefaultQuestion</p>
}

export default AnswerDefaultQuestion;
