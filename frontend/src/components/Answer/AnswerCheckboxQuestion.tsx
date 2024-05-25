import { Answer } from "@/types/question.type";

function AnswerCheckboxQuestion({ answerOption }: { answerOption: Answer }) {
  return (
    <div className="input-checkbox--sm2 checkbox-container">
      <input id={answerOption.id} type="checkbox" className="checkbox"></input>
      <label htmlFor={answerOption.id} className="checkbox-label">{answerOption.content}</label>
    </div>
  )
}

export default AnswerCheckboxQuestion;
