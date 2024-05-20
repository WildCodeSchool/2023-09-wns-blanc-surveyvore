import { Answer } from "@/types/question.type";

function AnswerRadioQuestion({ answerOption, questionId }: { answerOption: Answer, questionId: string | undefined }) {
  return (
    <div className="radio-container">
      <label htmlFor={answerOption.id} className="radio-label">{answerOption.content}</label>
      <input id={answerOption.id} name={questionId} type="radio" className="radio-input" value={answerOption.id}></input>
    </div>
  )
}

export default AnswerRadioQuestion;