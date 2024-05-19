import { Answer } from "@/types/question.type";

function AnswerCheckboxQuestion({ answerOption }: { answerOption: Answer }) {
  return (
    <div className="input-checkbox--sm">
      <label htmlFor={answerOption.id}>{answerOption.content}</label>
      <input id={answerOption.id} type="checkbox" className="checkbox"></input>
    </div>
  )
}

export default AnswerCheckboxQuestion;
