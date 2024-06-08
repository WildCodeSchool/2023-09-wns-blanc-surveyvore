import { Answer } from "@/types/question.type";

function AnswerCheckboxQuestion({ answerOption }: { answerOption: Answer }) {
  return (
    <div className="input-checkbox input-checkbox--sm">
      <label htmlFor={answerOption.id} >
        <input id={answerOption.id} type="checkbox"></input>
        <div className="checkbox" />
        {answerOption.content}</label>
    </div>
  )
}

export default AnswerCheckboxQuestion;
