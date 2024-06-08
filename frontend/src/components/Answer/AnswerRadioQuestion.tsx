import { Answer } from "@/types/question.type";

function AnswerRadioQuestion({ answerOption, questionId }: { answerOption: Answer, questionId: string | undefined }) {
  return (
    <div className="input-radio input-radio--sm">
      <label htmlFor={answerOption.id}>
        <input id={answerOption.id} name={questionId} type="radio" value={answerOption.id}></input>
        <div className="radio"></div>
        {answerOption.content}</label>
    </div>
  )
}

export default AnswerRadioQuestion;