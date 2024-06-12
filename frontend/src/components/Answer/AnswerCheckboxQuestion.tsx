import { Answer } from "@/types/question.type";

function AnswerCheckboxQuestion({ answerOption, questionId }: { answerOption: Answer, questionId: string | undefined }) {
  return (
    <div className="input-checkbox input-checkbox--sm">
      <label htmlFor={answerOption.id} >
        <input id={answerOption.id} name={questionId} type="checkbox" value={answerOption.id}></input>
        <div className="checkbox" />
        {answerOption.content}</label>
    </div>
  )
}

export default AnswerCheckboxQuestion;
