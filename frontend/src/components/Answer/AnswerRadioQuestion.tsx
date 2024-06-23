import { Answer } from "@/types/question.type";
import { QuestionForAnswerPage } from "@/types/questionForAnswerPage.type";

function AnswerRadioQuestion({ answerOption, questionId, questions, setQuestions }: { answerOption: Answer, questionId: string | undefined, questions: QuestionForAnswerPage[] | undefined, setQuestions: React.Dispatch<React.SetStateAction<QuestionForAnswerPage[]>> }) {

  const onChangeValue = () => {
    const updatedQuestion = questions && questions.map(q => {
      if (q.id === questionId) {
        return { ...q, isError: false }
      } else {
        return q
      }
    }
    )
    if (updatedQuestion) {
      setQuestions(updatedQuestion);
    }
  }

  return (
    <div className="input-radio input-radio--sm">
      <label htmlFor={answerOption.id}>
        <input id={answerOption.id} name={questionId} type="radio" value={answerOption.id} onChange={onChangeValue}></input>
        <div className="radio"></div>
        {answerOption.content}</label>
    </div>
  )
}

export default AnswerRadioQuestion;