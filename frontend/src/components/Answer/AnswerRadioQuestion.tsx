import { Answer } from "@/types/question.type";

function AnswerRadioQuestion({ answerOption, questionId }: { answerOption: Answer, questionId: string | undefined }) {
  return (
    <div className="radio-container">
      <input id={answerOption.id} name={questionId} type="radio" className="radio-input" value={answerOption.id}></input>
      <label htmlFor={answerOption.id} className="radio-label">{answerOption.content}</label>
    </div>
  )
}

export default AnswerRadioQuestion;