import { Question } from "@/types/question.type";
import { QuestionForAnswerPage } from "@/types/questionForAnswerPage.type";

function AnswerCheckboxesQuestion({
  question,
  questions,
  setQuestions,
}: {
  question: Question;
  questions: QuestionForAnswerPage[] | undefined;
  setQuestions: React.Dispatch<React.SetStateAction<QuestionForAnswerPage[]>>;
}) {
  const onChangeValue = () => {
    const updatedQuestion =
      questions &&
      questions.map((q) => {
        if (q.id === question.id) {
          return { ...q, isError: false };
        } else {
          return q;
        }
      });
    if (updatedQuestion) {
      setQuestions(updatedQuestion);
    }
  };

  return (
    <div className="checkbox-plus-description">
      <div className="input-checkbox input-checkbox--sm">
        <label htmlFor={`question-input-${question.id}`}>
          <input
            id={`question-input-${question.id}`}
            name={question.id}
            type="checkbox"
            value={question.title}
            onChange={onChangeValue}
          ></input>
          <div className="checkbox" />
          {question.title}
        </label>
      </div>
      {question.description && <p>{question.description}</p>}
    </div>
  );
}

export default AnswerCheckboxesQuestion;
